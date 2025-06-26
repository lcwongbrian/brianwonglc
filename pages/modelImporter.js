import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import UploadPanel from "@/components/UploadPanel";
import ModelViewer from "@/components/ModelViewer";

export default function ModelImporter() {
    const [modelUrl, setModelUrl] = useState(null);
	const [modelType, setModelType] = useState(null)

    return (
        <Row style={{height: "calc(100vh - 80px)"}}>
            <Col lg={4} xs={12}>
                <UploadPanel setModelUrl={setModelUrl} setModelType={setModelType} />
            </Col>
            <Col lg={8} xs={12}>
                <ModelViewer url={modelUrl} type={modelType} />
            </Col>
        </Row>
    );
};