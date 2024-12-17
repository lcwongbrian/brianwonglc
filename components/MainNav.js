import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";

export default function MainNav() {
    const router = useRouter();

    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggleNavbar = () => {
        setIsExpanded(!isExpanded);
    };

    const handleCloseNavbar = () => {
        setIsExpanded(false);
    };

    return (
        <>
            <Navbar expand="lg" className="fixed-top navbar-dark bg-primary" expanded={isExpanded}>
                <Container>
                    <Navbar.Brand>Brian Wong</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleToggleNavbar}/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Link href="/" passHref legacyBehavior>
                                <Nav.Link active={router.pathname === "/"} onClick={handleCloseNavbar}>Home</Nav.Link>
                            </Link>
                            <NavDropdown title="3D Demo" id="basic-nav-dropdown">
                                <Link href="/surface" passHref legacyBehavior>
                                    <NavDropdown.Item active={router.pathname === "/surface"} onClick={handleCloseNavbar}>Surface Height Data Visualization</NavDropdown.Item>
                                </Link>
                                <Link href="/heat" passHref legacyBehavior>
                                    <NavDropdown.Item active={router.pathname === "/heat"} onClick={handleCloseNavbar}>Heat Conduction Simulation</NavDropdown.Item>
                                </Link>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <br />
            <br />
            <br />
        </>
    );
}
