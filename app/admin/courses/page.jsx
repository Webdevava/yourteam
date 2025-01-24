'use client'
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

export default function CourseManagement() {
  const [courses, setCourses] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [newCourse, setNewCourse] = useState({
    title: "",
    difficulty: "",
    duration: "",
    description: "",
    colleges: [],
    thumbnail: null,
    content: [],
  });
  const [editingCourse, setEditingCourse] = useState(null);

  useEffect(() => {
    fetchCourses();
    fetchColleges();
  }, []);

  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/admin/courses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
      toast({
        title: "Error",
        description: "Failed to fetch courses. Please try again.",
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
      formData.append("title", newCourse.title);
      formData.append("difficulty", newCourse.difficulty);
      formData.append("duration", newCourse.duration);
      formData.append("description", newCourse.description);
      formData.append("colleges", JSON.stringify(newCourse.colleges));
      if (newCourse.thumbnail) {
        formData.append("thumbnail", newCourse.thumbnail);
      }
      formData.append("content", JSON.stringify(newCourse.content));

      const response = await fetch("/api/admin/courses", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        fetchCourses();
        setNewCourse({
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
          description: "Course added successfully.",
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add course");
      }
    } catch (error) {
      console.error("Error adding course:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to add course. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateCourse = async () => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      for (const key in editingCourse) {
        if (key === "colleges") {
          formData.append(key, JSON.stringify(editingCourse[key]));
        } else if (key === "content") {
          editingCourse[key].forEach((item, index) => {
            formData.append(`content[${index}][type]`, item.type);
            if (item.file instanceof File) {
              formData.append(`content[${index}][file]`, item.file);
            } else {
              formData.append(`content[${index}][url]`, item.url);
            }
          });
        } else if (key === "thumbnail") {
          if (editingCourse[key] instanceof File) {
            formData.append(key, editingCourse[key]);
          } else {
            formData.append(key, editingCourse[key]);
          }
        } else {
          formData.append(key, editingCourse[key]);
        }
      }

      const response = await fetch(`/api/admin/courses/${editingCourse._id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      if (response.ok) {
        fetchCourses();
        setEditingCourse(null);
        toast({
          title: "Success",
          description: "Course updated successfully.",
        });
      } else {
        throw new Error("Failed to update course");
      }
    } catch (error) {
      console.error("Error updating course:", error);
      toast({
        title: "Error",
        description: "Failed to update course. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/admin/courses/${courseId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setCourses(courses.filter((course) => course._id !== courseId));
        toast({
          title: "Success",
          description: "Course deleted successfully.",
        });
      } else {
        throw new Error("Failed to delete course");
      }
    } catch (error) {
      console.error("Error deleting course:", error);
      toast({
        title: "Error",
        description: "Failed to delete course. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Function to add content to newCourse
  const addCourseContent = (type) => {
    setNewCourse((prev) => ({
      ...prev,
      content: [...prev.content, { type, file: null }],
    }));
  };

  // Function to update content in newCourse
  const updateCourseContent = (index, file) => {
    const updatedContent = [...newCourse.content];
    updatedContent[index].file = file;
    setNewCourse((prev) => ({
      ...prev,
      content: updatedContent,
    }));
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mb-4">Add New Course</Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Course</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="Title"
              value={newCourse.title}
              onChange={(e) =>
                setNewCourse({ ...newCourse, title: e.target.value })
              }
            />

            <Select
              value={newCourse.difficulty}
              onValueChange={(value) =>
                setNewCourse({ ...newCourse, difficulty: value })
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
              value={newCourse.duration}
              onChange={(e) =>
                setNewCourse({ ...newCourse, duration: e.target.value })
              }
            />

            <Textarea
              placeholder="Description"
              value={newCourse.description}
              onChange={(e) =>
                setNewCourse({ ...newCourse, description: e.target.value })
              }
            />

            <Select
              multiple
              value={newCourse.colleges}
              onValueChange={(value) =>
                setNewCourse({ ...newCourse, colleges: value })
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
              placeholder="Course Thumbnail"
              onChange={(e) =>
                setNewCourse({ ...newCourse, thumbnail: e.target.files[0] })
              }
            />

            <div>
              <h3 className="mb-2">Course Content</h3>
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

              {newCourse.content.map((content, index) => (
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

            <Button onClick={handleAddCourse}>Add Course</Button>
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
          {courses.map((course) => (
            <TableRow key={course._id}>
              <TableCell>{course.title}</TableCell>
              <TableCell>{course.description}</TableCell>
              <TableCell>{course.difficulty}</TableCell>
              <TableCell>{course.duration}</TableCell>
              <TableCell>{course.colleges}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="mr-2"
                      onClick={() => setEditingCourse(course)}
                    >
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Edit Course</DialogTitle>
                    </DialogHeader>
                    {editingCourse && (
                      <div className="grid gap-4 py-4">
                        <Input
                          placeholder="Title"
                          value={editingCourse.title}
                          onChange={(e) =>
                            setEditingCourse({
                              ...editingCourse,
                              title: e.target.value,
                            })
                          }
                        />

                        <Select
                          value={editingCourse.difficulty}
                          onValueChange={(value) =>
                            setEditingCourse({
                              ...editingCourse,
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
                          value={editingCourse.duration}
                          onChange={(e) =>
                            setEditingCourse({
                              ...editingCourse,
                              duration: e.target.value,
                            })
                          }
                        />

                        <Textarea
                          placeholder="Description"
                          value={editingCourse.description}
                          onChange={(e) =>
                            setEditingCourse({
                              ...editingCourse,
                              description: e.target.value,
                            })
                          }
                        />

                        <Select
                          multiple
                          value={editingCourse.colleges}
                          onValueChange={(value) =>
                            setEditingCourse({
                              ...editingCourse,
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
                            setEditingCourse({
                              ...editingCourse,
                              thumbnail: e.target.files[0],
                            })
                          }
                        />

                        {/* Similar content management as in add course */}
                        <Button onClick={handleUpdateCourse}>
                          Update Course
                        </Button>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
                <Button
                  variant="destructive"
                  onClick={() => handleDeleteCourse(course._id)}
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
