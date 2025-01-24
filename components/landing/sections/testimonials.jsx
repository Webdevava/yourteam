import React from 'react'
import {
  Card,
  CardContent,
} from "@/components/ui/card";

const Testimonials = () => {
  return (
    <section className="container mx-auto px-14 py-24 pt-0">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">What Our Students Say</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Hear from developers who have transformed their careers through our
          platform.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="bg-card rounded-[2.5rem] shadow-inner">
            <CardContent className="p-8">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10" />
                  <div>
                    <h4 className="font-semibold">Student Name</h4>
                    <p className="text-sm text-muted-foreground">
                      Software Developer
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  &quot;The structured learning path and hands-on projects
                  helped me land my dream job as a developer. The community
                  support was incredible!&quot;
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default Testimonials
