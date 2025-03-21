"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import axios from "axios";

interface FormData {
  subscriber_type: string;
  holding_type?: string;
  entity_file?: string;
  custodian_agreement?: boolean;
}

const questions = [
  {
    id: "subscriber_type",
    text: "Please select the type of Subscriber:",
    type: "select",
    options: [
      "Natural person",
      "Entity (Corporation, LLC, Partnership, Trust)",
      "IRA/401(k) Subscriber",
    ],
  },
  {
    id: "holding_type",
    text: "How will you be holding your subscription?",
    type: "select",
    options: [
      "Holding for self only",
      "Holding as joint tenant with spouse",
      "Revocable Grantor Trust",
    ],
    condition: { subscriber_type: "Natural person" },
  },
  {
    id: "entity_details",
    text: "Please upload entity formation documents (LLC Agreement, etc.)",
    type: "file",
    condition: { subscriber_type: "Entity (Corporation, LLC, Partnership, Trust)" },
  },
  {
    id: "custodian_agreement",
    text: "Please complete the Agreement of Custodian of IRA/401(k) Subscribers",
    type: "checkbox",
    condition: { subscriber_type: "IRA/401(k) Subscriber" },
  },
];

export default function DynamicSubscriptionForm() {
  const { control, handleSubmit, watch, setValue } = useForm<FormData>();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFilePreview(URL.createObjectURL(file)); // Generate preview
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.fileUrl) {
        setValue("entity_file", response.data.fileUrl);
        setUploadedFile(file);
      }
    } catch (error) {
      console.error("File upload failed", error);
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post("/api/submit", data);
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const selectedType = watch("subscriber_type");

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Subscription Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {questions.map((q) => {
          if (q.condition && selectedType !== q.condition.subscriber_type) return null;

          return (
            <div key={q.id} className="mb-4">
              <Label>{q.text}</Label>
              <Controller
                name={q.id as keyof FormData}
                control={control}
                render={({ field }) =>
                  q.type === "select" ? (
                    <Select {...field} value={field.value || ""} onChange={field.onChange}>
                      <option value="">Select an option</option>
                      {q.options.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </Select>
                  ) : q.type === "file" ? (
                    <Input type="file" onChange={handleFileUpload} />
                  ) : q.type === "checkbox" ? (
                    <Input type="checkbox" {...field} />
                  ) : null
                }
              />
            </div>
          );
        })}
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
