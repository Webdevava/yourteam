"use client";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

// Difficulty levels
const DIFFICULTY_LEVELS = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

// Content types
const CONTENT_TYPES = [
  { value: "pdf", label: "PDF Document" },
  { value: "video", label: "Video" },
  { value: "image", label: "Image" },
];

export default function ProjectManagement() {
  const [projects, setProjects] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [newProject, setNewProject] = useState({
    title: "",
    difficulty: "",
    duration: "",
    description: "",
    colleges: [],
    thumbnail: null,
    content: [],
  });
  const [editingProject, setEditingProject] = useState(null);

  useEffect(() => {
    fetchProjects();
    fetchColleges();
  }, []);

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/admin/projects", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
      toast({
        title: "Error",
        description: "Failed to fetch projects. Please try again.",
        variant: "destructive",
      });
    }
  };

  const fetchColleges = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/admin/colleges", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setColleges(data);
    } catch (error) {
      console.error("Error fetching colleges:", error);
      toast({
        title: "Error",
        description: "Failed to fetch colleges. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleAddCourse = async () => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("title", newProject.title);
      formData.append("difficulty", newProject.difficulty);
      formData.append("duration", newProject.duration);
      formData.append("description", newProject.description);
      formData.append("colleges", JSON.stringify(newProject.colleges));
      if (newProject.thumbnail) {
        formData.append("thumbnail", newProject.thumbnail);
      }
      formData.append("content", JSON.stringify(newProject.content));

      const response = await fetch("/api/admin/projects", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        await response.json();
        fetchProjects();
        setNewProject({
          title: "",
          difficulty: "",
          duration: "",
          description: "",
          colleges: [],
          thumbnail: null,
          content: [],
        });
        toast({
          title: "Success",
          description: "Project added successfully.",
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add project");
      }
    } catch (error) {
      console.error("Error adding project:", error);
      toast({
        title: "Error",
        description:
          error.message || "Failed to add project. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateCourse = async () => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      for (const key in editingProject) {
        if (key === "colleges") {
          formData.append(key, JSON.stringify(editingProject[key]));
        } else if (key === "content") {
          editingProject[key].forEach((item, index) => {
            formData.append(`content[${index}][type]`, item.type);
            if (item.file instanceof File) {
              formData.append(`content[${index}][file]`, item.file);
            } else {
              formData.append(`content[${index}][url]`, item.url);
            }
          });
        } else if (key === "thumbnail") {
          if (editingProject[key] instanceof File) {
            formData.append(key, editingProject[key]);
          } else {
            formData.append(key, editingProject[key]);
          }
        } else {
          formData.append(key, editingProject[key]);
        }
      }

      const response = await fetch(
        `/api/admin/projects/${editingProject._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      if (response.ok) {
        fetchProjects();
        setEditingProject(null);
        toast({
          title: "Success",
          description: "Project updated successfully.",
        });
      } else {
        throw new Error("Failed to update project");
      }
    } catch (error) {
      console.error("Error updating project:", error);
      toast({
        title: "Error",
        description: "Failed to update project. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/admin/projects/${courseId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setProjects(projects.filter((project) => project._id !== courseId));
        toast({
          title: "Success",
          description: "Project deleted successfully.",
        });
      } else {
        throw new Error("Failed to delete project");
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      toast({
        title: "Error",
        description: "Failed to delete project. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Function to add content to newProject
  const addCourseContent = (type) => {
    setNewProject((prev) => ({
      ...prev,
      content: [...prev.content, { type, file: null }],
    }));
  };

  // Function to update content in newProject
  const updateCourseContent = (index, file) => {
    const updatedContent = [...newProject.content];
    updatedContent[index].file = file;
    setNewProject((prev) => ({
      ...prev,
      content: updatedContent,
    }));
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mb-4">Add New Project</Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Project</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="Title"
              value={newProject.title}
              onChange={(e) =>
                setNewProject({ ...newProject, title: e.target.value })
              }
            />

            <Select
              value={newProject.difficulty}
              onValueChange={(value) =>
                setNewProject({ ...newProject, difficulty: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Difficulty" />
              </SelectTrigger>
              <SelectContent>
                {DIFFICULTY_LEVELS.map((level) => (
                  <SelectItem key={level.value} value={level.value}>
                    {level.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              placeholder="Duration"
              value={newProject.duration}
              onChange={(e) =>
                setNewProject({ ...newProject, duration: e.target.value })
              }
            />

            <Textarea
              placeholder="Description"
              value={newProject.description}
              onChange={(e) =>
                setNewProject({ ...newProject, description: e.target.value })
              }
            />

            <Select
              multiple
              value={newProject.colleges}
              onValueChange={(value) =>
                setNewProject({ ...newProject, colleges: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Colleges" />
              </SelectTrigger>
              <SelectContent>
                {colleges.map((college) => (
                  <SelectItem key={college._id} value={college._id}>
                    {college.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              type="file"
              accept="image/*"
              placeholder="Project Thumbnail"
              onChange={(e) =>
                setNewProject({ ...newProject, thumbnail: e.target.files[0] })
              }
            />

            <div>
              <h3 className="mb-2">Project Content</h3>
              <Select onValueChange={addCourseContent}>
                <SelectTrigger>
                  <SelectValue placeholder="Add Content" />
                </SelectTrigger>
                <SelectContent>
                  {CONTENT_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {newProject.content.map((content, index) => (
                <div key={index} className="mt-2 flex items-center gap-2">
                  <span className="capitalize">{content.type}</span>
                  <Input
                    type="file"
                    onChange={(e) =>
                      updateCourseContent(index, e.target.files[0])
                    }
                  />
                </div>
              ))}
            </div>

            <Button onClick={handleAddCourse}>Add Project</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Desc</TableHead>
            <TableHead>Difficulty</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>College</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project._id}>
              <TableCell>{project.title}</TableCell>
              <TableCell>{project.description}</TableCell>
              <TableCell>{project.difficulty}</TableCell>
              <TableCell>{project.duration}</TableCell>
              <TableCell>{project.colleges}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="mr-2"
                      onClick={() => setEditingProject(project)}
                    >
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Edit Project</DialogTitle>
                    </DialogHeader>
                    {editingProject && (
                      <div className="grid gap-4 py-4">
                        <Input
                          placeholder="Title"
                          value={editingProject.title}
                          onChange={(e) =>
                            setEditingProject({
                              ...editingProject,
                              title: e.target.value,
                            })
                          }
                        />

                        <Select
                          value={editingProject.difficulty}
                          onValueChange={(value) =>
                            setEditingProject({
                              ...editingProject,
                              difficulty: value,
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Difficulty" />
                          </SelectTrigger>
                          <SelectContent>
                            {DIFFICULTY_LEVELS.map((level) => (
                              <SelectItem key={level.value} value={level.value}>
                                {level.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <Input
                          placeholder="Duration"
                          value={editingProject.duration}
                          onChange={(e) =>
                            setEditingProject({
                              ...editingProject,
                              duration: e.target.value,
                            })
                          }
                        />

                        <Textarea
                          placeholder="Description"
                          value={editingProject.description}
                          onChange={(e) =>
                            setEditingProject({
                              ...editingProject,
                              description: e.target.value,
                            })
                          }
                        />

                        <Select
                          multiple
                          value={editingProject.colleges}
                          onValueChange={(value) =>
                            setEditingProject({
                              ...editingProject,
                              colleges: value,
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Colleges" />
                          </SelectTrigger>
                          <SelectContent>
                            {colleges.map((college) => (
                              <SelectItem key={college._id} value={college._id}>
                                {college.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            setEditingProject({
                              ...editingProject,
                              thumbnail: e.target.files[0],
                            })
                          }
                        />

                        {/* Similar content management as in add project */}
                        <Button onClick={handleUpdateCourse}>
                          Update Project
                        </Button>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
                <Button
                  variant="destructive"
                  onClick={() => handleDeleteCourse(project._id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
