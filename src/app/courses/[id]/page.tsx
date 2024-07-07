export default function CoursePage({ params }: { params: { id: string } }) {
    return (
        <div className="h-screen flex items-center justify-center">
            <h1 className="text-5xl">Course {params.id} Page</h1>
        </div>
    )
}