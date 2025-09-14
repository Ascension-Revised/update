-- Add construction material column to products table
ALTER TABLE products ADD COLUMN IF NOT EXISTS construction_material VARCHAR(100);

-- Update existing products to have a default material
UPDATE products SET construction_material = 'Steel' WHERE construction_material IS NULL;

-- Make construction_material required for new products
ALTER TABLE products ALTER COLUMN construction_material SET NOT NULL;

-- Create index for faster material queries
CREATE INDEX IF NOT EXISTS idx_products_material ON products(construction_material);
