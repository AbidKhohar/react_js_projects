
import React, { useEffect, useState } from "react";
import { useForm } from "@tanstack/react-form";
import { createEmployee, updateEmployee } from "../api/employeeApi";
import { employeeSchema } from "../api/employeeSchema";
//Update it

const EmployeeForm = ({ selected, onSaved }) => {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

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
      name: "",
      designation: "",
      salary: "",
    },
    onSubmit: async ({ value }) => {
      setLoading(true);
      setServerError("");
      try {
        const data = {
          name: value.name,
          designation: value.designation,
          salary: parseFloat(value.salary),
        };

        if (selected?.id) {
          await updateEmployee(selected.id, data);
        } else {
          await createEmployee(data);
        }

        form.reset();
        onSaved();
      } catch (err) {
        setServerError(err.response?.data?.message || "Operation failed");
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    if (selected) {
      form.setFieldValue("name", selected.name || "");
      form.setFieldValue("designation", selected.designation || "");
      form.setFieldValue("salary", selected.salary?.toString() || "");
    } else {
      form.reset();
    }
  }, [selected, form]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {selected ? "✏️ Edit Employee" : "➕ Add New Employee"}
      </h2>

      {serverError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          ⚠️ {serverError}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="space-y-5"
      >
        {/* Name Field */}
        <form.Field
          name="name"
          validators={{
            onChange: ({ value }) =>
              validateField(employeeSchema.shape.name, value),
          }}
        >
          {(field) => (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                placeholder="Enter full name"
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
                <p className="text-red-500 text-xs mt-1">{field.state.meta.errors[0]}</p>
              )}
            </div>
          )}
        </form.Field>

        {/* Designation Field */}
        <form.Field
          name="designation"
          validators={{
            onChange: ({ value }) =>
              validateField(employeeSchema.shape.designation, value),
          }}
        >
          {(field) => (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
              <input
                type="text"
                placeholder="Enter job designation"
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
                <p className="text-red-500 text-xs mt-1">{field.state.meta.errors[0]}</p>
              )}
            </div>
          )}
        </form.Field>

        {/* Salary Field */}
        <form.Field
          name="salary"
          validators={{
            onChange: ({ value }) => {
              const numValue = parseFloat(value) || 0;
              return validateField(employeeSchema.shape.salary, numValue);
            },
          }}
        >
          {(field) => (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Salary</label>
              <input
                type="number"
                placeholder="Enter salary"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                step="0.01"
                min="0"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
                  field.state.meta.errors
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              {field.state.meta.errors && (
                <p className="text-red-500 text-xs mt-1">{field.state.meta.errors[0]}</p>
              )}
            </div>
          )}
        </form.Field>

        {/* Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {loading ? "⏳ Saving..." : selected ? "✓ Update" : "✓ Add"}
          </button>
          {selected && (
            <button
              type="button"
              onClick={() => onSaved()}
              className="px-6 py-2 bg-gray-400 text-white font-semibold rounded-lg hover:bg-gray-500 transition"
            >
              ✕ Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;