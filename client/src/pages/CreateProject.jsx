const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const projectData = {
      ...formData,
      budget: Number(formData.budget),
      skills: formData.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),
    };

    const response = await fetch("http://localhost:5000/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to create project");
    }

    alert("Project created successfully! 🎉");

    setFormData({
      title: "",
      description: "",
      budget: "",
      skills: "",
      deadline: "",
    });
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};