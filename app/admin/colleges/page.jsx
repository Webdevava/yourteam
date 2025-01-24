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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function CollegeManagement() {
  const [colleges, setColleges] = useState([]);
  const [newCollege, setNewCollege] = useState({ name: "" });

  useEffect(() => {
    fetchColleges();
  }, []);

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
      toast.error("Failed to fetch colleges");
    }
  };

  const handleAddCollege = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/admin/colleges", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCollege),
      });

      if (response.ok) {
        fetchColleges();
        setNewCollege({ name: "" });
        toast.success("College added successfully");
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Failed to add college");
      }
    } catch (error) {
      toast.error("Failed to add college");
    }
  };

  const handleDeleteCollege = async (collegeId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `/api/admin/colleges?collegeId=${collegeId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        fetchColleges();
        toast.success("College deleted successfully");
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Failed to delete college");
      }
    } catch (error) {
      toast.error("Failed to delete college");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">College Management</h1>

      <Dialog>
        <DialogTrigger asChild>
          <Button className="mb-4">Add New College</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New College</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="College Name"
              value={newCollege.name}
              onChange={(e) =>
                setNewCollege({ ...newCollege, name: e.target.value })
              }
            />
            <Button onClick={handleAddCollege}>Add College</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>College Name</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {colleges.map((college) => (
            <TableRow key={college._id}>
              <TableCell>{college.name}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="destructive" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Confirm Deletion</DialogTitle>
                    </DialogHeader>
                    <p>
                      Are you sure you want to delete the college &quot;
                      {college.name}&quot;?
                    </p>
                    <div className="flex justify-end space-x-2">
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button
                        variant="destructive"
                        onClick={() => handleDeleteCollege(college._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {colleges.length === 0 && (
        <div className="text-center text-muted-foreground mt-10">
          No colleges found
        </div>
      )}
    </div>
  );
}
