import React, { useState, useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useMutation } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BsFillFilePersonFill} from "react-icons/bs";
import { API } from "../config/api";

export default function EditPages() {
  let navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    nik: "",
    name: "",
    birth: "",
    gender: "",
    address: "",
    country: "",
  });

  let getData = async () => {
    const response = await API.get("/data/" + id);
    setForm({
      ...form,
      nik: response.data.nik,
      name: response.data.name,
      birth: response.data.birth,
      gender: response.data.gender,
      address: response.data.address,
      country: response.data.country,
    });
  };
  
  useEffect(() => {
    getData();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      await API.patch("/data", form);
      alert("data berhasil dirubah");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div>
      <Container className="mt-3 opacity-75">
        <h3>
          <span>
          <BsFillFilePersonFill style={{ width: "30px" }} className="m-3"/>
          </span>
          Aplikasi Data Pribadi
        </h3>
        <h5 className="my-3">Edit Data Pribadi</h5>
        <Form onSubmit={(e) => handleSubmit.mutate(e)}>
          <Row>
            <Col>
              <Row>
                <Col xs={12} md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>NIK</Form.Label>
                    <Form.Control
                      type="text"
                      name="nik"
                      id="nik"
                      value={form.nik}
                      onChange={handleChange}
                      disabled
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Nama Lengkap</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      id="name"
                      value={form.name}
                      onChange={handleChange}
                    />
                  </Form.Group>

          <div className="flex flex-col mb-3">
            <label className="mb-2">
              Jenis Kelamin
            </label>
            <div>
              <input
                type="radio"
                name="gender"
                id="male"
                value= "Laki-laki"
                onChange={handleChange}
                checked={form.gender === "Laki-laki"}
              />
              <label htmlFor="male" className=" me-5 ms-1">
                Laki-Laki
              </label>

              <input
                type="radio"
                name="gender"
                id="female"
                value="Perempuan"
                onChange={handleChange}
                checked={form.gender === "Perempuan"}
              />
              <label htmlFor="female" className="mr-3 ms-1">
                Perempuan
              </label>
            </div>
          </div>

                  <Form.Group className="mb-3">
                    <Form.Label>Tanggal Lahir</Form.Label>
                    <Form.Control
                      type = "date"
                      rows={3}
                      name="birth"
                      id="birth"
                      value={form.birth}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="address"
                      id="address"
                      value={form.address}
                      onChange={handleChange}
                    />
              </Form.Group>
            <label htmlFor="country" className="mb-2 me-3">
            Negara
          </label>
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:outline-orange-600 w-full px-4 py-2 mb-3"
            name="country"
            id="country"
            onChange={handleChange}
            value={form.country}
          >
           <option selected disabled>
                Pilih Negara
            </option>
            <option value="Indonesia">Indonesia</option>
            <option value="Malaysia">Malaysia</option>
            <option value="Singapura">Singapura</option>
            <option value="Thailand">Thailand</option>
            <option value="Amerika">Amerika</option>
            <option value="Jepang">Jepang</option>
            <option value="China">China</option>
          </select>
                </Col>
              </Row>
              <Button type="submit" style={{ width: "100px" }}>
                Edit
              </Button>
              <Link to={"/"}>
                <Button
                  variant="secondary"
                  className="ms-2"
                  style={{ width: "100px" }}
                >
                  Kembali
                </Button>
              </Link>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
}
