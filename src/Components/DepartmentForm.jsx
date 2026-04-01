import React, { useEffect, useState } from "react";
import { useForm } from "@tanstack/react-form";
import { departmentSchema } from "../api/departmentSchema";
import { toast } from "sonner";

const DepartmentForm = ({ selected, onSaved }) => {
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
      name: "",
      description: "",
    },
    onSubmit: ({ value }) => {
      setLoading(true);
      try {
        const data = {
          name: value.name,
          description: value.description,
        };

        if (selected?.id) {
          toast.success("Department updated successfully!");
        } else {
          toast.success("Department created successfully!");
        }

        form.reset();
        onSaved(data, selected?.id);
      } catch (err) {
        toast.error("Operation failed");
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    if (selected) {
      form.setFieldValue("name", selected.name || "");
      form.setFieldValue("description", selected.description || "");
    } else {
      form.reset();
    }
  }, [selected, form]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {selected ? "✏️ Edit Department" : "➕ Add New Department"}
      </h2>

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
              validateField(departmentSchema.shape.name, value),
          }}
        >
          {(field) => (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Department Name
              </label>
              <input
                type="text"
                placeholder="Enter department name"
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
                <p className="text-red-500 text-xs mt-1">
                  {field.state.meta.errors[0]}
                </p>
              )}
            </div>
          )}
        </form.Field>

        {/* Description Field */}
        <form.Field
          name="description"
          validators={{
            onChange: ({ value }) =>
              validateField(departmentSchema.shape.description, value),
          }}
        >
          {(field) => (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                placeholder="Enter department description"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                rows="4"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition resize-none ${
                  field.state.meta.errors
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              {field.state.meta.errors && (
                <p className="text-red-500 text-xs mt-1">
                  {field.state.meta.errors[0]}
                </p>
              )}
            </div>
          )}
        </form.Field>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
        >
          {loading ? "Saving..." : selected ? "Update Department" : "Add Department"}
        </button>
      </form>
    </div>
  );
};

export default DepartmentForm;
