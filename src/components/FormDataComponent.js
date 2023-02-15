import React, { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { MEM_TYPE } from "../constants/constants";

export default function FormDataComponent() {
  const [memType, setMemType] = useState(0);
  const [memDate, setMemDate] = useState(
    new Date().toJSON().slice(0, 10).replace(/-/g, "-")
  );
  const [memTitle, setMemTitle] = useState("");
  const [memUrl, setMemUrl] = useState("");
  const [memItemList, setMemItemList] = useState([]);

  const refTitle = useRef();
  const refUrl = useRef();
  const refULItem = useRef();
  const refSaveBtn = useRef();
  const refFileInput = useRef();

  useEffect(() => {
    const storageMemItemList = JSON.parse(localStorage.getItem("memItemList"));
    if (storageMemItemList) {
      console.log("storageMemItemList");
      console.log(storageMemItemList);
      setMemItemList(storageMemItemList);
    }
  }, []);

  const handleAdd = () => {
    const refTitleValue = refTitle.current.value.replace(/\s+/g, "");
    const refUrlValue = refUrl.current.value.replace(/\s+/g, "");
    if (refTitleValue.length == 0 || refUrlValue.length == 0) return;

    let memItem = {
      type: memType,
      date: memDate,
      title: memTitle,
      url: memUrl,
    };

    const newList = memItemList.concat(memItem);
    setMemItemList(newList);

    memItemList.push(memItem);
    console.log("memItemList");
    console.log(memItemList);

    // Add items to Local Storage
    localStorage.setItem("memItemList", JSON.stringify(memItemList));
    refTitle.current.value = "";
    refUrl.current.value = "";
  };

  const handleExport = () => {
    const fileData = JSON.stringify(memItemList);
    const blob = new Blob([fileData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "export-mem.json";
    link.href = url;
    link.click();
  };

  const handleImport = (e) => {
    var file = e.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function (e) {
      // read data from file and set memory list state
      setMemItemList(JSON.parse(e.target.result));
    };
    reader.readAsText(file);
  };

  return (
    <div className="container">
      <Form>
        <Form.Group controlId="formGroupTitle">
          <Form.Label>Type and Date</Form.Label>
          <InputGroup className="mb-3">
            <Form.Select onChange={(e) => setMemType(e.target.value)}>
              {MEM_TYPE.map((item, index = 0) => (
                <option key={index} value={index++}>
                  {item}
                </option>
              ))}
            </Form.Select>
            <Form.Control
              type="date"
              min="1977-03-17"
              max="2077-03-17"
              aria-label="Date of the memory"
              defaultValue={memDate}
              onChange={(e) => setMemDate(e.target.value)}
            />
          </InputGroup>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            ref={refTitle}
            onChange={(e) => setMemTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formLink">
          <Form.Label>Related link</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter url"
            ref={refUrl}
            onChange={(e) => setMemUrl(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleAdd} type="button">
          Add
        </Button>{" "}
        <Button
          variant="outline-success"
          onClick={handleExport}
          type="button"
          ref={refSaveBtn}
        >
          Export to file
        </Button>{" "}
        <Form.Control
          ref={refFileInput}
          onChange={handleImport}
          type="file"
          style={{ display: "none" }}
        />
        <Button
          variant="outline-warning"
          onClick={() => refFileInput.current.click()}
          type="button"
        >
          Import from file
        </Button>
      </Form>
      <div>
        <hr />
        <ul ref={refULItem}>
          {memItemList.map((item, index = 0) => (
            <li key={index++}>{JSON.stringify(item)}</li>
          ))}
        </ul>

        {/**
         * console.log(JSON.stringify(memItemList, null, "\t"))
         */}
      </div>
    </div>
  );
}
