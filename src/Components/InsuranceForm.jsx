import React, { useEffect, useState } from "react";
import { useForm } from "@tanstack/react-form";
import { createInsurance, updateInsurance } from "../api/insuranceApi";
import { insuranceSchema } from "../api/insuranceSchema";
import { toast } from "sonner";

const InsuranceForm = ({ selected, onSaved }) => {
  const [loading, setLoading] = useState(false);

  const validateField = (validator, value) => {
    try {
      validator.parse(value);
      return undefined;
    } catch (error) {
      if (error.errors && error.errors.length > 0) {
        return error.errors[0].message;
      }
      return "Validation failed";
    }
  };

  const form = useForm({
    defaultValues: {
      insuranceName: "",
      insuranceType: "",
      amount: "",
    },
    onSubmit: async ({ value }) => {
      setLoading(true);
      try {
        const data = {
          insuranceName: value.insuranceName,
          insuranceType: value.insuranceType,
          amount: parseFloat(value.amount),
        };

        if (selected?.id) {
          await updateInsurance(selected.id, data);
          toast.success("Insurance updated successfully!");
        } else {
          await createInsurance(data);
          toast.success("Insurance created successfully!");
        }

        form.reset();
        onSaved();
      } catch (err) {
        const errorMessage =
          err.response?.data?.message || "Operation failed";
        toast.error(errorMessage);
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    if (selected) {
      form.setFieldValue("insuranceName", selected.insuranceName || "");
      form.setFieldValue("insuranceType", selected.insuranceType || "");
      form.setFieldValue("amount", selected.amount?.toString() || "");
    } else {
      form.reset();
    }
  }, [selected, form]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {selected ? "✏️ Edit Insurance" : "➕ Add New Insurance"}
      </h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="space-y-5"
      >
        {/* Insurance Name Field */}
        <form.Field
          name="insuranceName"
          validators={{
            onChange: ({ value }) =>
              validateField(insuranceSchema.shape.insuranceName, value),
          }}
        >
          {(field) => (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Insurance Name
              </label>
              <input
                type="text"
                placeholder="Enter insurance name"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
                  field.state.meta.errors
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              {field.state.meta.errors && (
                <p className="text-red-500 text-sm mt-1">{field.state.meta.errors[0]}</p>
              )}
            </div>
          )}
        </form.Field>

        {/* Insurance Type Field */}
        <form.Field
          name="insuranceType"
          validators={{
            onChange: ({ value }) =>
              validateField(insuranceSchema.shape.insuranceType, value),
          }}
        >
          {(field) => (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Insurance Type
              </label>
              <input
                type="text"
                placeholder="Enter insurance type (e.g., Health, Life, Auto)"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
                  field.state.meta.errors
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              {field.state.meta.errors && (
                <p className="text-red-500 text-sm mt-1">{field.state.meta.errors[0]}</p>
              )}
            </div>
          )}
        </form.Field>

        {/* Amount Field */}
        <form.Field
          name="amount"
          validators={{
            onChange: ({ value }) => {
              const numValue = parseFloat(value);
              if (isNaN(numValue)) {
                return "Amount must be a valid number";
              }
              return validateField(insuranceSchema.shape.amount, numValue);
            },
          }}
        >
          {(field) => (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amount
              </label>
              <input
                type="number"
                placeholder="Enter amount"
                step="0.01"
                min="0"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
                  field.state.meta.errors
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              {field.state.meta.errors && (
                <p className="text-red-500 text-sm mt-1">{field.state.meta.errors[0]}</p>
              )}
            </div>
          )}
        </form.Field>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition disabled:opacity-50"
          >
            {loading ? "Processing..." : selected ? "Update Insurance" : "Add Insurance"}
          </button>
          {selected && (
            <button
              type="button"
              onClick={() => {
                form.reset();
                onSaved();
              }}
              className="flex-1 px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default InsuranceForm;
