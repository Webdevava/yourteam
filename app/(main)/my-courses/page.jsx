"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"


export default function CoursesPage() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/user/courses", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        if (!response.ok) {
          throw new Error("Failed to fetch courses")
        }
        const data = await response.json()
        setCourses(data)
      } catch (err) {
      console.log(err);

        setError("Failed to load courses")
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [])

  const handleEnroll = async (courseId) => {
    try {
      const response = await fetch("/api/user/enroll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ type: "course", id: courseId }),
      })
      if (!response.ok) {
        throw new Error("Failed to enroll")
      }
      router.push("/dashboard")
    } catch (err) {
      console.log(err);

      setError("Failed to enroll in course")
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Available Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course) => (
          <Card key={course._id}>
            <CardHeader>
              <CardTitle>{course.title}</CardTitle>
              <CardDescription>
                {course.difficulty} | {course.duration}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Image
                src={course.thumbnail || "/placeholder.svg"}
                alt={course.title}
                className="w-full h-40 object-cover mb-2"
              />
              <p>{course.description}</p>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleEnroll(course._id)}>Enroll</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

