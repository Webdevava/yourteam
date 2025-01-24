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
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

export function CollegeManagement() {
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
      console.error("Error fetching colleges:", error);
      toast({
        title: "Error",
        description: "Failed to fetch colleges. Please try again.",
        variant: "destructive",
      });
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
        toast({
          title: "Success",
          description: "College added successfully.",
        });
      } else {
        throw new Error("Failed to add college");
      }
    } catch (error) {
      console.error("Error adding college:", error);
      toast({
        title: "Error",
        description: "Failed to add college. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
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
          </TableRow>
        </TableHeader>
        <TableBody>
          {colleges.map((college) => (
            <TableRow key={college._id}>
              <TableCell>{college.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
