import { useEffect, useState } from "react";
import {
    Image,
    Row,
    Col,
    Card,
    Badge,
    Button,
    ListGroup,
} from "react-bootstrap";


export default function Home() {
    const [skillList, setSkillList] = useState(null);

    useEffect(() => {
        setSkillList([
            {
                label: "Frontend",
                skills: [
                    "HTML5",
                    "CSS",
                    "React",
                    "Angular",
                    "Vue",
                    "jQuery",
                    "Typescript",
                    "Redux",
                    "Next.js",
                    "Phaser.js",
                    "Three.js",
                    "WordPress",
                ],
            },
            {
                label: "Backend",
                skills: ["Node.js", "C++", "C", "Java", "Python", "Golang"],
            },
            {
                label: "Database",
                skills: [
                    "SQL",
                    "NoSQL",
                    "OracleDB",
                    "MongoDB",
                    "PostgreSQL",
                    "MySQL",
                    "MS SQL",
                ],
            },
            {
                label: "Cloud",
                skills: ["Microsoft Azure", "Amazon Web Service", "IBM Cloud"],
            },
            {
                label: "API",
                skills: ["REST", "SOAP", "GraphQL", "WebSocket"],
            },
            {
                label: "Version Control",
                skills: ["GIT", "SVN"],
            },
            {
                label: "OS",
                skills: ["Linux", "Unix", "AIX"],
            },
        ]);
    }, []);

    return (
        <>
            <Row>
                <Col md={4}>
                    <Image src="/daruma.jpg" fluid rounded />
                </Col>
                <Col md={8}>
                    <Card>
                        <Card.Header>About Me</Card.Header>
                        <Card.Body>
                            {/* <Card.Title>About Me</Card.Title> */}
                            <Card.Text>
                                To be short, I am a STEAM-lover (STEAM for
                                Science, Technology, Engineering, Art,
                                Mathematics) who was born in Hong Kong.
                                <br />
                                <br />
                                When choosing what degree to study in
                                university, I chose Engineering Physics solely
                                because of my love to science. In the meantime
                                of my studying, I discovered my interest in
                                programming. A dream of making scientific 3D
                                graphical simulation started to grow. I made it
                                happen in my final year project using OpenGL to
                                visualize a huge data file, containing numerous
                                frame of surface height information, in
                                3-dimensional manner.
                                <br />
                                <br />
                                After my graduation of the degree, I engaged in
                                building services, semiconductuctor industries
                                and finally I seized the opportunity to enter
                                information technology. I started as a trainee
                                in virtualization in cloud computing back to the
                                days AWS (Amazon Web Services) starting
                                prevailing. I learned every thing about network,
                                infrastructure, virtual machines. One day my
                                team leader asked if I was interested in
                                programming. My answer was a big "Yes"! This was
                                the first page of my life as a web developer.
                                The development team then contained only 2
                                members, my team leader (as back-end and devops
                                developer), and me (as front-end developer).
                                Finally, this team of two managed to launch a
                                smart roster arrangement system for elderly
                                healthcare organization from scratch. We were
                                also invited my Microsoft to demonstrate our
                                product in their Hong Kong office. After we all
                                left that company, my former team leader joined
                                a IoT (Internet of Things) startup and referred
                                me to work together again. This time I joined as
                                a back-end developer, working on API, smart
                                device / software interfacing, tools making and
                                system deployment on cloud. With both front-end
                                and back-end skillsets, I can then entered
                                well-known enterprises like IBM and SCMP
                                participating in large-scale projects.
                                <br />
                                <br />
                                In recent years, I moved to Toronto for persuing
                                another studying of a diploma in computer
                                programming to strengthen my foundation in
                                software development. I have already graduated
                                with flying colors and now I am open to the
                                market to continue my journey as software
                                developer. Before starting the new potential
                                career, it is a good time to build something I
                                like - 3D simulation. In this portfolio, I am
                                thrilled to showcase my newly learnt 3D library,
                                Three.js, powered by WebGL. This is a good
                                approach bridging my profound experience in web
                                and self-taught 3D computer graphics.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <br />
                    <Card>
                        <Card.Header>Skills</Card.Header>
                        <ListGroup variant="flush">
                            {skillList && skillList.map((item, i) => (
                                <ListGroup.Item key={i}>
                                    <b>{item.label}: </b>
                                    {item.skills.map((skill) => (
                                        <div
                                            key={skill}
                                            style={{
                                                marginRight: "5px",
                                                display: "inline-block",
                                            }}
                                        >
                                            <Badge bg="light">{skill}</Badge>
                                        </div>
                                    ))}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Card>
                    <br />
                    <Card>
                        <Card.Header>Demo</Card.Header>
                        <Card.Img variant="top" src="/demo_surface.jpg" />
                        <Card.Body>
                            <Card.Title>
                                Surface Height Data Visualization
                            </Card.Title>
                            <Card.Text>
                                The miniature version of my final year project.
                                This is a simulation of time-lapse thin film
                                coating process. The original project was
                                written in C++ with obsolete GLUT and GLUI
                                libraries as the abstraction layer and GUI for
                                OpenGL. It is re-written with Three.js, embedded
                                in Next.js React framework via React-three-fiber
                                renderer. Instead of storing the vertices into a
                                huge text file, the vertices are now grouped by
                                frame and stored in MongoDB. Upon toggling to
                                certain frame, the corresponding vertices will
                                be loaded from the database via a RESTful API
                                written in Golang.
                            </Card.Text>
                            <Button href="/surface" variant="info">Go</Button>                            
                        </Card.Body>
                        <Card.Footer>
                            Applied technology: React, Next.js, Three.js, React-three-fiber, Leva, Golang, MongoDB
                        </Card.Footer>
                    </Card>
                    <br />
                    <Card>
                        <Card.Header>Links</Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <a
                                    href="https://www.linkedin.com/in/brianwonglc/"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    LinkedIn
                                </a>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <a
                                    href="https://github.com/lcwongbrian"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    GitHub
                                </a>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
}