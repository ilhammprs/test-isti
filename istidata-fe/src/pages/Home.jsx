import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Table,
} from "react-bootstrap";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { BsFillFilePersonFill} from "react-icons/bs";
import { API } from "../config/api";

export default function Home() {

  const [idDelete, setIdDelete] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let navigate = useNavigate();
  const [filter, setFilter] = useState([]);

  let { data: fachData, refetch } = useQuery("fachData", async () => {
    const response = await API.get("/data");
    setFilter(response.data)
    return response.data;
  });

  const handleDelete = (id) => {
    setIdDelete(id);
    handleShow();
  };

  const handleDeletes = () => {
    setConfirmDelete(true);
  };

  //search
  const [form, setForm] = useState({
    nik: "",
    name: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify(form);
      const response = await API.post("/data/search" , body, config );

      if (response.status === 200) {
        setFilter(response.data)
      }
    } catch (error) {
    }
  });
  
  const deleteById = useMutation(async (id) => {
    try {
      await API.delete("/data/" + id);
      refetch();
    } catch (error) {
    }
  });

  useEffect(() => {
    if (confirmDelete) {
      handleClose();
      deleteById.mutate(idDelete);
      setConfirmDelete(null);
    }
  }, [confirmDelete]);

  useEffect(() => {
    if (form.nik == "" && form.name == "0") {
      setFilter(fachData)
    }
  }, [fachData]);

  const handleDetail = (id) => {
    navigate("/detail/" + id);
  };
  const handleUpdate = (id) => {
    navigate("/edit/" + id);
  };

  //umur
  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  return (
    <div>
      <Container className="mt-3 ">
        <h3>
          <span>
          <BsFillFilePersonFill style={{ width: "30px",color: "grey" }} className="mb-2 me-3" alt="" />
          </span>
          Aplikasi Data Pribadi
        </h3>
        <Card className=" bg-search">
          <Card.Body>
            <Form onSubmit={(e) => handleSubmit.mutate(e)}>
              <Form.Group>
                <Form.Label className="t fw-bolder opacity-75">
                  NIK
                </Form.Label>
                <Form.Control
                  type="text"
                  id="nik"
                  name="nik"
                  style={{ width: "30%" }}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label className="fw-bolder opacity-75 mt-2">
                  Name
                </Form.Label>
                <Form.Control
                  type="text"
                  id="name"
                  name="name"
                  onChange={handleChange}
                  style={{ width: "30%" }}
                />
              </Form.Group>
           <Col className="text-end">
          <Button
          type="submit"
              variant="primary"
              className="my-2 fw-bolder me-3"
              style={{ width: "10%" }}
            >
              Search
            </Button>
            <Button
              variant="primary"
              className="my-2 fw-bolder"
              style={{ width: "10%" }}
              onClick={() => navigate("/add")}
            >
              Add
            </Button>
        </Col>
            </Form>
          </Card.Body>
        </Card>
        <Table size="lg" striped bordered hover>
                <thead>
                  <tr
                    style={{
                      height: "1rem",
                      backgroundColor: "#bac5e1",
                    }}
                  >
                    <th width="1%" className="text-center">
                      No
                    </th>
                    <th>NIK</th>
                    <th>Nama Lengkap</th>
                    <th>Umur</th>
                    <th>Tanggal Lahir</th>
                    <th>Jenis Kelamin</th>
                    <th>Alamat</th>
                    <th>Negara</th>
                    <th style={{ width: "10rem", textAlign: "center" }}>
                      Action
                    </th>
                  </tr>
                </thead>
           <tbody>
            {filter?.map((data, index) => (
              <tr key={index} className="opacity-75">
                <td>{index + 1}</td>
                <td>{data?.nik}</td>
                <td>{data?.name}</td>
                <td>{getAge(data?.birth)}</td>
                <td>{data?.birth}</td>
                <td>{data?.gender}</td>
                <td>
                  {data?.address}
                </td>
                <td>{data?.country}</td>
                <td className="d-flex gap-3">
                  <div
                    className="text-warning pointer"
                    onClick={() => handleDetail(data?.nik)}
                  >
                    Detail
                  </div>
                  <div
                    className="text-primary pointer "
                    onClick={() => {
                      handleUpdate(data?.nik);
                    }}
                  >
                    Edit
                  </div>
                  <div
                    className="text-danger pointer"
                    onClick={() => {
                      handleDelete(data?.nik);
                    }}
                  >
                    Hapus
                  </div>
                  <Modal show={show} onHide={handleClose} centered>
                    <Modal.Body>
                      <h3 className="text-center">Hapus</h3>
                      <div className="my-4"> Anda yakin ingin menghapus data yang dipilih ?</div>
                      <div className="my-3 text-end">
                        <Button
                          variant="danger"
                          className="me-2"
                          style={{ width: "100px" }}
                          onClick={handleDeletes}
                        >
                          Ok
                        </Button>
                        <Button
                          variant="secondary"
                          style={{ width: "100px" }}
                          onClick={handleClose}
                        >
                          Batal
                        </Button>
                      </div>
                    </Modal.Body>
                  </Modal>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}
