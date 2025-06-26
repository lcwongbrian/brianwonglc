import { Card, Form } from "react-bootstrap";

export default function UploadPanel({
    setModelUrl,
    setModelType
}) {
    const handleFileChange = (e) => {
        const supportedFileFormats = [".obj", ".stl"];
        const file = e.target.files[0];
        if (
            file && supportedFileFormats.some((extension) => file.name.endsWith(extension))
        ) {
            const url = URL.createObjectURL(file);
            const type = file.name.split('.').pop().toLowerCase();
            setModelUrl(url);
            setModelType(type);
        } else {
            alert("Please upload a OBJ or STL file");
        }
    };

    return (
        <Card
            bg="primary"
            text="light"
            className="mb-2"
        >
            <Card.Body>
                <Card.Title>Upload 3D Model</Card.Title>
                <Form.Control
                    type="file"
                    accept=".obj,.stl"
                    onChange={handleFileChange}
                />
                <Card.Text>Supported formats: .obj, .stl</Card.Text>
            </Card.Body>
        </Card>
    );
};