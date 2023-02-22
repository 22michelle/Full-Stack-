import { useEffect, useRef, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, getPost, savePost, updatePost } from "./redux/postSlice";


const initialState = {
  title: "",
  description: "",
  imgUrl: "",
};

function App() {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.postStore);
  const refInput = useRef();

  const [formulario, setFormulario] = useState(initialState);

  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    dispatch(getPost());
  }, []);

  const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const actions = (e) => {
    e.preventDefault();
    isEdit ? dispatch(updatePost(formulario)) : dispatch(savePost(formulario));

    refInput.current.focus();
    cleanState();
  };

  const cleanState = () => {
    setFormulario(initialState);
    setIsEdit(false);
  };

  const clickUpdate = (post) => {
    setFormulario(post);
    setIsEdit(true);
  };

  return (
    <div className="container mt-3">
      <Row>
        <Col xs={12} md={4}>
          <Card>
            <Card.Body>
              <Form onSubmit={actions}>
                <Form.Group className="mt-3 mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    ref={refInput}
                    type="text"
                    placeholder="Enter Title"
                    autoFocus
                    value={formulario.title}
                    name="title"
                    onChange={(e) => handleChange(e)}
                  />
                </Form.Group>

                <Form.Group className="mt-3 mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Description"
                    value={formulario.description}
                    name="description"
                    onChange={(e) => handleChange(e)}
                  />
                </Form.Group>

                <Form.Group className="mt-3 mb-3">
                  <Form.Label>imgUrl</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Img Url"
                    value={formulario.imgUrl}
                    name="imgUrl"
                    onChange={(e) => handleChange(e)}
                  />
                </Form.Group>
                <Button type="submit" variant={isEdit ? "warning" : "primary"}>
                  {isEdit ? "Update" : "Save"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={8}>
          <Row>
            {posts.map((post) => (
              <Col xs={12} md={6} key={post._id}>
                <Card className="mt-3 mb-3">
                  <Card.Img variant="top" src={post.imgUrl} />
                  <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Text>{post.description}</Card.Text>
                  </Card.Body>
                  <div className="m-2 d-flex justify-content-between">
                    <Button
                      variant="danger"
                      onClick={() => dispatch(deletePost(post._id))}
                    >
                      Delete
                    </Button>
                    <Button variant="success" onClick={() => clickUpdate(post)}>
                      Update
                    </Button>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default App;
