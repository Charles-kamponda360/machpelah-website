// Supabase Configuration
const SUPABASE_URL = 'https://ycpaoqlcqziszlkbmtys.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InljcGFvcWxjcXppc3psa2JtdHlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUxNDI4NzIsImV4cCI6MjA1MDcxODg3Mn0.sb_publishable_B-DnNsNPUfFycsXAzCOL9g_4gwZFAnF';

// Initialize Supabase client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Products Database Functions
const ProductsDB = {
    // Get all products
    async getAll() {
        try {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .order('id', { ascending: false });
            
            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error('Error fetching products:', error);
            return [];
        }
    },

    // Add new product
    async add(product) {
        try {
            const { data, error } = await supabase
                .from('products')
                .insert([{
                    name: product.name,
                    category: product.category,
                    price: product.price,
                    stock: product.stock,
                    image: product.image,
                    description: product.description
                }])
                .select();
            
            if (error) throw error;
            return { success: true, data: data[0] };
        } catch (error) {
            console.error('Error adding product:', error);
            return { success: false, error: error.message };
        }
    },

    // Update product
    async update(id, updates) {
        try {
            const { data, error } = await supabase
                .from('products')
                .update(updates)
                .eq('id', id)
                .select();
            
            if (error) throw error;
            return { success: true, data: data[0] };
        } catch (error) {
            console.error('Error updating product:', error);
            return { success: false, error: error.message };
        }
    },

    // Delete product
    async delete(id) {
        try {
            const { error } = await supabase
                .from('products')
                .delete()
                .eq('id', id);
            
            if (error) throw error;
            return { success: true };
        } catch (error) {
            console.error('Error deleting product:', error);
            return { success: false, error: error.message };
        }
    }
};

// Announcements Database Functions
const AnnouncementsDB = {
    // Get current announcement
    async get() {
        try {
            const { data, error } = await supabase
                .from('announcements')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(1)
                .single();
            
            if (error && error.code !== 'PGRST116') throw error;
            return data || null;
        } catch (error) {
            console.error('Error fetching announcement:', error);
            return null;
        }
    },

    // Update or create announcement
    async set(text, type) {
        try {
            // First, try to get existing announcement
            const { data: existing } = await supabase
                .from('announcements')
                .select('id')
                .limit(1)
                .single();

            if (existing) {
                // Update existing
                const { data, error } = await supabase
                    .from('announcements')
                    .update({
                        text: text,
                        type: type,
                        updated_at: new Date().toISOString()
                    })
                    .eq('id', existing.id)
                    .select();
                
                if (error) throw error;
                return { success: true, data: data[0] };
            } else {
                // Create new
                const { data, error } = await supabase
                    .from('announcements')
                    .insert([{
                        text: text,
                        type: type
                    }])
                    .select();
                
                if (error) throw error;
                return { success: true, data: data[0] };
            }
        } catch (error) {
            console.error('Error setting announcement:', error);
            return { success: false, error: error.message };
        }
    },

    // Clear announcement
    async clear() {
        try {
            const { error } = await supabase
                .from('announcements')
                .delete()
                .neq('id', 0); // Delete all rows
            
            if (error) throw error;
            return { success: true };
        } catch (error) {
            console.error('Error clearing announcement:', error);
            return { success: false, error: error.message };
        }
    }
};