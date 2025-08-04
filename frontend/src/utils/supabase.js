import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://emgsqbpwistpmnrwmjzx.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtZ3NxYnB3aXN0cG1ucndtanp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM3ODA4OTMsImV4cCI6MjA2OTM1Njg5M30.N3kX7VJxuNY-LpNOLsvF0XRB2TvFqud3BRwc7hnutx8";
const supabase = createClient(supabaseUrl, supabaseKey);

export const uploadToSupabase = async (file) => {
  const fileName = `${Date.now()}_${file.name}`;
  
  // Determine the MIME type of the file
  const contentType = file.type || "application/octet-stream"; // Default to binary stream if no type is found
  
  const { data, error } = await supabase.storage
    .from("chati")
    .upload(fileName, file, {
      upsert: false,
      cacheControl: "3600",
      contentType, // Set content type explicitly
    });

  if (error) {
    throw new Error("Error uploading file: " + error.message);
  }

  const urlData = supabase.storage.from("chati").getPublicUrl(fileName);

  return urlData?.data?.publicUrl; // Return the public URL of the uploaded file
};
