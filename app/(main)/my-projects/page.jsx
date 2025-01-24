"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"


export default function ProjectsPage() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/user/projects", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        if (!response.ok) {
          throw new Error("Failed to fetch projects")
        }
        const data = await response.json()
        setProjects(data)
      } catch (err) {
      console.log(err);

        setError("Failed to load projects")
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const handleEnroll = async (projectId) => {
    try {
      const response = await fetch("/api/user/enroll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ type: "project", id: projectId }),
      })
      if (!response.ok) {
        throw new Error("Failed to enroll")
      }
      router.push("/dashboard")
    } catch (err) {
      console.log(err);

      setError("Failed to enroll in project")
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Available Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <Card key={project._id}>
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
              <CardDescription>
                {project.difficulty} | {project.duration}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Image
                src={project.thumbnail || "/placeholder.svg"}
                alt={project.title}
                className="w-full h-40 object-cover mb-2"
              />
              <p>{project.description}</p>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleEnroll(project._id)}>Enroll</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

