import { useEffect, useState } from "react";
import {
    Image,
    Card,
    Badge,
    Button,
    ListGroup,
    Carousel,
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
            <Carousel>
                <Carousel.Item>
                    <a href="/surface">
                        <img
                            className="d-block w-100"
                            src="/demo_surface.jpg"
                        />
                        <Carousel.Caption>
                            <h3>Surface Height Data Visualization</h3>
                            <p>
                                A simulation of time-lapse thin film coating
                                process in which the vertices in each frame are
                                stored in PostgreSQL. Upon toggling to certain
                                frame, the corresponding vertices will be loaded
                                from the database via a RESTful API written in
                                Golang.
                            </p>
                        </Carousel.Caption>
                    </a>
                </Carousel.Item>
                <Carousel.Item>
                    <a href="/heat">
                        <img className="d-block w-100" src="/demo_heat.jpg" />
                        <Carousel.Caption>
                            <h3>Heat Conduction Simulation</h3>
                            <p>
                                Simulation of time-dependent heat conduction
                                process, applying Euler's method on 2D heat flow
                                equation. Written with Three.js, embedded in
                                Next.js React framework via React-three-fiber
                                renderer.
                            </p>
                        </Carousel.Caption>
                    </a>
                </Carousel.Item>
                <Carousel.Item>
                    <a href="/modelImporter">
                        <img
                            className="d-block w-100"
                            src="/demo_modelImporter.jpg"
                        />
                        <Carousel.Caption>
                            <h3>3D Model Importer</h3>
                            <p>
                                A 3D model importer that accepts .obj, .stl and
                                provides preview feature.
                            </p>
                        </Carousel.Caption>
                    </a>
                </Carousel.Item>
                <Carousel.Item>
                    <a href="/ripple">
                        <img className="d-block w-100" src="/demo_ripple.jpg" />
                        <Carousel.Caption>
                            <h3>GLSL Ripple Animation</h3>
                            <p>
                                Animation created by altering the vertices and
                                fragnment colors by GLSL so that an attenuated
                                travelling wave pattern is shown.
                            </p>
                        </Carousel.Caption>
                    </a>
                </Carousel.Item>
            </Carousel>
            <br />
            <Card>
                <Card.Header>About Me</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <Image
                            src="/daruma.jpg"
                            fluid
                            rounded
                            height="25%"
                            width="25%"
                            style={{ float: "left", margin: "0 20px 10px 0" }}
                        />
                        To be short, I am a STEAM-lover (STEAM for Science,
                        Technology, Engineering, Art, Mathematics) who was born
                        in Hong Kong.
                        <br />
                        <br />
                        When choosing what degree to study in university, I
                        chose Engineering Physics solely because of my love to
                        science. In the meantime, I discovered my interest in
                        programming. My dream of making scientific 3D graphical
                        simulation started to grow. I made it happen in my final
                        year project using OpenGL to visualize a huge data file,
                        containing numerous frames of surface height
                        information, in 3-dimensional manner.
                        <br />
                        <br />
                        After my graduation of the degree, I engaged in building
                        services, semiconductor industries in turn before I
                        seized the opportunity to enter information technology.
                        I started as a trainee in virtualization in cloud
                        computing back in the days AWS (Amazon Web Services)
                        starting prevailing. I learned everything about
                        networks, infrastructure, virtual machines. One day my
                        team leader asked if I was interested in programming. My
                        answer was a big "Yes"! This was the first page of my
                        life as a web developer. The development team then
                        contained only 2 members, my team leader (as back-end
                        and devops developer), and me (as front-end developer).
                        Finally, this team of two managed to launch a smart
                        roster arrangement system for elderly healthcare
                        organizations from scratch. We were also invited my
                        Microsoft to demonstrate our product in their Hong Kong
                        office. After we all left that company, my former team
                        leader joined an IoT (Internet of Things) startup and
                        referred me to work together again. This time I joined
                        as a back-end developer, working on API, smart device /
                        software interfacing, tools making and system deployment
                        on cloud. With both front-end and back-end skillsets, I
                        can then enter well-known enterprises like IBM and SCMP
                        participating in large-scale projects.
                        <br />
                        <br />
                        In recent years, I moved to Toronto for pursuing another
                        studying of a diploma in computer programming to
                        strengthen my foundation in software development. I have
                        already graduated with flying colors and now I am open
                        to the market to continue my journey as a software
                        developer. Before starting a new potential career, it is
                        a good time to build something I like - 3D simulation.
                        In this portfolio, I am thrilled to showcase my newly
                        learnt 3D library, Three.js, powered by WebGL. This is a
                        good approach bridging my profound experience in web and
                        self-taught 3D computer graphics.
                    </Card.Text>
                </Card.Body>
            </Card>
            <br />
            <Card>
                <Card.Header>Skills</Card.Header>
                <ListGroup variant="flush">
                    {skillList &&
                        skillList.map((item, i) => (
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
                                        <Badge bg="info">{skill}</Badge>
                                    </div>
                                ))}
                            </ListGroup.Item>
                        ))}
                </ListGroup>
            </Card>
            <br />
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
        </>
    );
}
