import {
  IAttribute,
  //modifyAttribute,
  modifyMeasure,
  //modifySimpleMeasure,
  //newAbsoluteDateFilter,
  // newArithmeticMeasure,
  newMeasure,
  //newNegativeAttributeFilter,xxx
 // newPositiveAttributeFilter,
  //newRelativeDateFilter,
  // modifySimpleMeasure,
   newAttribute,
} from "@gooddata/sdk-model";
import { idRef } from "@gooddata/sdk-model/esm/objRef/factory";
// import { workspace } from "../constants";
import * as Md from "./full";

export const SumOfAmount = modifyMeasure(Md.Amount_1.Sum, (m) =>
    m.format("#,##0.00").localId("sumOfAmountId").title("Sum of Amount"),
);

export const countOfCustomerId = newMeasure(idRef("customers.customer_id","attribute"), (m) =>
    m.format("#,##0.00").localId("countOfCustomerId").title("# of CustomerId").aggregation("count")
);

export const appxCountOfCustomerId = newMeasure(idRef("customers.customer_id","attribute"), (m) =>
    m.format("#,##0.00").localId("appxCountOfCustomerId").title("Appx.Count of CustomerId").aggregation("approximate_count")
);

export const Product_Name : IAttribute = newAttribute("products.product_name");



