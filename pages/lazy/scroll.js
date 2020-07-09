import fetch from "isomorphic-fetch";
import { useEffect } from "react";

const Scroll = ({ data: data }) => {

    useEffect(()=>{
        const targets = document.querySelectorAll('img');
        console.log(targets);
        

        window.addEventListener('scroll', (event)=> {
            targets.forEach(target => {
                const rect = target.getBoundingClientRect().top;
                if(rect <= window.innerHeight) {
                    const src = target.getAttribute('data-lazy');
                    target.setAttribute('src', src); 
                    target.classList.add('fade');
                }
            })
        })
    })

  return (
    <div>
      <h2> Images </h2>
      {data.map((img, index) =>(
        <div key={index}>
            <img loading="lazy" data-lazy={img.flag}></img>
          <p>{img.name}</p>
        </div>
      ))}
    </div>
  );
};

Scroll.getInitialProps = async () => {
  try {
    const images = await fetch(
      "https://restcountries.eu/rest/v2/all"
    );
    const res = await images.json();
    return { data: res };
  } catch (err) {
    console.log("Something went wrong!", err);
  }
};

export default Scroll;
