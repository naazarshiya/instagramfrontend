import React, { useState, useEffect } from "react";
import "../css/Createpost.css";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

export default function Createpost() {
  const [body, setBody] = useState("");
  const [image, setImage] = useState("")
  const [url, setUrl] = useState("")
  const navigate = useNavigate()

  // Toast functions
  const notifyA = (msg) => toast.error(msg)
  const notifyB = (msg) => toast.success(msg)


  useEffect(() => {

    // saving post to mongodb
    if (url) {

      fetch("http://localhost:5000/createPost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("jwt")
        },
        body: JSON.stringify({
          body,
          pic: url
        })
      }).then(res => res.json())
        .then(data => {
          if (data.error) {
            notifyA(data.error)
          } else {
            notifyB("Successfully Posted")
            navigate("/")
          }
        })
        .catch(err => console.log(err))
    }

  }, [url])


  // posting image to cloudinary
  const postDetails = () => {

    console.log(body, image)
    const data = new FormData()
    data.append("file", image)
    data.append("upload_preset", "insta-clone")
    data.append("cloud_name", "Arshiya28naaz")
    fetch(" https://api.cloudinary.com/v1_1/arshiya28naaz/image/upload", {
      method: "post",
      body: data
    }).then(res => res.json())
      .then(data => setUrl(data.url))
      .catch(err => console.log(err))
    console.log(url)

  }


  const loadfile = (event) => {
    var output = document.getElementById("output");
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src); 
    };
  };
  return (
    <div className="createPost">
      {/* //header */}
      <div className="post-header">
        <h4 style={{ margin: "3px auto" }}>Create New Post</h4>
        <button id="post-btn" onClick={() => { postDetails() }}>Share</button>
      </div>
      {/* image preview */}
      <div className="main-div">
        <img
          id="output"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAdVBMVEX///8AAAAwMDDo6Oj09PTU1NTw8PC0tLT6+vpVVVW5ubnHx8fExMTr6+snJyfNzc1wcHCUlJQXFxciIiJ+fn6Ojo7a2tpPT08WFhYQEBDg4OBdXV1jY2N2dnajo6NHR0dAQECqqqqGhoaampo6Ojo7OzssLCzXK8vRAAAFrUlEQVR4nO2d63riOAxAh2vCbSBAS2GgLe207/+IS3emi+34It9kaz+d33HqU4JjW5L58YNhGIZhGIZhGIZhGIZhGIZhGKZq1t1hSItDt/bwm28HFNnOgX7TWemuBjObQgRPND/APzyNAJ8gZcHbk+r+FOk+on+YuQSb0j2MxjXc/CzdwWh+2gXXpfuXAPt78aF09xLwYDV8Ld29BLxYDY+lu5eAo9WwdO+SwIYy5+Y0qplT05+ieBkurFfXwTLGkILgbbEXbvgLqYuxHIINl0g9jOUabDhG6mEs6/+94YQNBdiwTthQhA3rhA1F6jI8LbvN+cb+Omlt1xE1nL5/CF3ZbSwbTCQNR5eBys44TSZo2HY9vy8Oj/rL6RmufmsFb1y115MztG1LX3QNqBn2diUkzpoWxAyV7vbYOJtYb1/esHUI6r6LtAwB8cveiErKEBK/7AUmKBm2oPilGgSlZHiFCPaCoJQMdyBDdZuTkKHrTfHN2drM+icKG4JD0PJiipDhJ9RQXkrRMRxDBQfPUjs6htCvoTp1o2O4ABvKmU90DO2rCpGD1I4NRdgwL/CcMzk6TcfwBDbcS+3oGMLTeRqpGSHDF6ihvAgmZPgMFFRS1wgZjoCGb3IzQobQLPOT3IqSIex9oWYyUTKEfYjqZhspw0eA4F5tRMoQsMzf9bpFy9D9TuyH2IoYtotuv+kaUKWVzHhoF2z6TUoYPn9XT10ApVYK5ujhF7oIIr7hSixq8E/hHFseVG3ND7rhSq5pCEg0fjP4DVfay7ENW3VPMCARd6Kk/f7L8d10NbLhr17XJgF3WaqOx87YHWRD3QvNf7i5cXoXRtXL0pIzhGt41QgOBvrvj5vHZdM087XjpYNqaJg6G4aIRGAarkylYS/WxLRIEA1b88v6NbD3EBAN+8PonYzlKXiG9nWBNp0pCWiGrjyKN/ctwsAydMfG7BW64SAZGodRAX1qYTRIhh8DANDTR/zAMTxDBDNVNKIYgrMoQmbhLjAM1TJOCyf33XxBMITsAX6zDVpoWMlvCM8S+eLTvlJY7g/nq99EPbth63nWxNAyC1/8TU70mh1kN+yXRjgwn1zxALgG3xAa9BMwzcLFmbvzsKA7yrcktaHHMHpHk45+mxXJW1i6rPwShj7DqEAvuqKZ12r/DeiG49Bjlzr1TppnATpTz2qo29eEoczC33XXmDZIEQ03wYJKBqXhRs+mP4xlGDCMCtw/xakxUqGJNGEawvPQ9Fz+vvqbJ/M1kMVINkN4kpaRt/lk8WzPfQYc2pnLcAwsHYjFUFaJYBg+jHrinIZnMtxjCbrPs8xjGDeM+jF0DAhZDOFJ5yl4tUc9chhCU+xScTD2JJNhi35QrXUWnsHQFoHJhC3qkd7QlCqRFcu+RnLDK5aUjHmhkdqw2Dm1xoVGYkPsYVTAtNBIa9iCIjCZMCw00hoWGEYF9LPwpIZ4s1E9WsWUhsUPND/qoh4JDeFFntnQLTTSGUIC2dn57M/C0xk68pOR+OgpJjMEBrKzM1MVUxnqT6cqgRrRSGRYfBgVUBTTGFYwjArIgZ0khn6B7PxIC40khtX9aIIY2ElhGBOByYSw0EhgWM8wKnAvcog3DApk5+e/iEa0YYIITB6+FxqxhiukCEwAozSGaBEYf3arFIYVDqN3fo/jDbUZBPUwjDaMDWRn5yXSsNph9M45yhArkB3FJcKwBZ81UpS90m0Pw6qHUQElydzDkChsSB82pA8b0ocN6cOG9GFD+rAhfdiQPmxIHzakDxvSx2pYQ+JaLEerYXUpFwHYK/nBR5RUTK+GWqJYHn5CHCWZocXn9aD+3JVKTfl5YTgPagKeil4t7uM0puhlaUnZAk5JGFlKx6vnCXSA0ZTugzqDnq49p/mkbn1Og1t3syEtZh3gaAKGYRiGYRiGYRiGYRiGYRiGYZiS/AMBf3WSltzwHAAAAABJRU5ErkJggg=="
        />
        <input
          type="file"
          accept="image/*"
          onChange={(event) => {
            loadfile(event);
            setImage(event.target.files[0])
          }}
        />
      </div>
      {/* details */}
      <div className="details">
        <div className="card-header">
          <div className="card-pic">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqlVhhYIbiPi-ntqSWrt1rdOyx-RxEdl_Vsg&usqp=CAU"
              alt=""
            />
          </div>
          <h5>Arshiya</h5>
        </div>
        <textarea value={body} onChange={(e) => {
          setBody(e.target.value)
        }} type="text" placeholder="Write a caption...."></textarea>
      </div>
    </div>
  );
}