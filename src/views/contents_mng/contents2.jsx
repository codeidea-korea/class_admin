import {
    Lucide,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownContent,
    DropdownItem,
  } from '@/base-components'
  import { useState, useReducer, useEffect } from 'react'
  import { useQuery, useMutation } from 'react-query'
  import request from '@/utils/request'
  import Loading from '@/components/loading'
  import useDidMountEffect from '@/hooks/useDidMountEffect'

function Contents2() {
    const [inputs, setInputs] = useState([]);

    useEffect(() => {
        setInputs([
          { link_url: "john", file: "test.jpg" },
          { link_url: "smith", file: "cat.jpg" },
        ]);
      }, []);

    const handleNameChange = (event, index) => {
        const newInputs = [...inputs];
        newInputs[index].link_url = event.target.value;
        setInputs(newInputs);
    };

    const handleImageChange = (event, index) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
        const newInputs = [...inputs];
        newInputs[index].file = reader.result;
        setInputs(newInputs);
        };

        if (file) {
        reader.readAsDataURL(file);
        }
    };

    const handleAddRow = () => {
        const newInputs = [...inputs, { link_url: "", file: "" }];
        setInputs(newInputs);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
      
        const formData = new FormData();
        inputs.forEach((input, index) => {
            formData.append("link_url", input.link_url);
            formData.append("file", input.file);
            formData.append("id", 43+index);
            formData.append("savedFileDelYN", 'N');
        });
      
        fetch("https://api.shuman.codeidea.io/admin/content-management/update", {
            headers: {
                'Content-Type': 'multipart/form-data', 

                'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0YWRtaW4xIiwiaWF0IjoxNjgxODgzMzczLCJleHAiOjE2ODE5Njk3NzN9.NxfNyuMFCni9sMtf_WNLg6axzW16ZJ80IZAxLagmTxc`
            },
            method: "POST",
            body: formData,
        })
          .then((response) => response.json())
          .then((data) => console.log(data))
          .catch((error) => console.error(error));
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                {inputs.map((input, index) => (
                    <div key={index}>
                    <label>
                        Name:
                        <input
                        type="text"
                        value={input.link_url}
                        onChange={(event) => handleNameChange(event, index)}
                        />
                    </label>
                    <br />
                    <label>
                        Image:
                        <input
                        type="file"
                        onChange={(event) => handleImageChange(event, index)}
                        />
                    </label>
                    <br />
                    {input.file && <img src={input.file} alt="uploaded file" />}
                    <br />
                    </div>
                ))}
                <div><button onClick={handleAddRow}>Add Row</button> </div>
                <button type="submit">Submit</button>
            </form>
        </>
    );
}

export default Contents2;
