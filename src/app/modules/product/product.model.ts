import { Schema, model } from 'mongoose';
import { ApiError } from '../../../utils';
import {
  IInventory,
  IProduct,
  IProductMethods,
  IProductModel,
  IVariant,
} from './product.interface';

const variantSchema = new Schema<IVariant>(
  {
    type: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  },
);

const inventorySchema = new Schema<IInventory>(
  {
    quantity: {
      type: Number,
      required: true,
    },
    inStock: {
      type: Boolean,
    },
  },
  {
    _id: false,
  },
);

const productSchema = new Schema<IProduct, IProductModel, IProductMethods>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    variants: {
      type: [variantSchema],
      required: true,
    },
    inventory: {
      type: inventorySchema,
      required: true,
    },
    isApproved: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

// This function runs before saving the product document
productSchema.pre('save', function (next) {
  if (this.isModified('inventory') || this.isNew) {
    this.inventory.inStock = this.inventory.quantity > 0;
  }
  next();
});

// Check that the product name exists to database
productSchema.statics.isProductNameExists = async function (name: string) {
  const result = await Product.findOne({ name });
  return result;
};

// Increment quantity
productSchema.methods.incrementQuantity = function (quantity: number) {
  this.inventory.quantity += quantity;
};

// Decrement quantity
productSchema.methods.decrementQuantity = function (quantity: number) {
  if (this.inventory.quantity < quantity) {
    throw new ApiError(400, 'Insufficient quantity');
  }
  this.inventory.quantity -= quantity;
};

// Define text index on title, description, and category fields
productSchema.index({ title: 'text', description: 'text', category: 'text' });

const Product = model<IProduct, IProductModel>('Product', productSchema);

export default Product;
