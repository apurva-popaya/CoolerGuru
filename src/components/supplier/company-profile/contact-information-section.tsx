import {
  SupplierFormCard,
  SupplierFormField,
  supplierInputClass,
  supplierTextareaClass,
} from "@/components/supplier/common/supplier-form";

export function ContactInformationSection() {
  return (
    <SupplierFormCard title="4. Contact Information">
      <div className="grid grid-cols-2 gap-3">
        <SupplierFormField label="Phone Number" required>
          <input defaultValue="+91 98765 43210" className={supplierInputClass} />
        </SupplierFormField>

        <SupplierFormField label="Email Address" required>
          <input type="email" defaultValue="info@abccooling.com" className={supplierInputClass} />
        </SupplierFormField>
      </div>

      <div className="mt-4">
        <SupplierFormField label="Address" required>
          <textarea defaultValue="123, Industrial Estate, Phase 2" className={supplierTextareaClass} />
        </SupplierFormField>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        <SupplierFormField label="City" required>
          <input defaultValue="Ahmedabad" className={supplierInputClass} />
        </SupplierFormField>

        <SupplierFormField label="State" required>
          <select defaultValue="Gujarat" className={supplierInputClass}>
            <option>Gujarat</option>
            <option>Maharashtra</option>
            <option>Delhi</option>
            <option>Rajasthan</option>
          </select>
        </SupplierFormField>

        <SupplierFormField label="PIN Code" required>
          <input defaultValue="380015" className={supplierInputClass} />
        </SupplierFormField>
      </div>
    </SupplierFormCard>
  );
}
