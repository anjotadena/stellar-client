import cuid from "cuid";
import { CartItem } from "./models/cart-item.model";
import { Cart as ICart} from "./models/cart.model";

export class Cart implements ICart {
  id = cuid();
  items: CartItem[] = [];
}
