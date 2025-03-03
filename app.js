const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=`;
const page_url = `http://en.wikipedia.org/?curid=`;

const form = document.querySelector(".form");
const input = document.querySelector(".form-input");
const results = document.querySelector(".results");

form.addEventListener("submit", (e) => {
  results.innerHTML = "";
  e.preventDefault();
  let value = input.value;
  if (!value) {
    results.innerHTML = "<h4  class='error'> No text provided</h4>";
    setTimeout(() => (results.innerHTML = ""), 1000);
    return;
  }
  fetchPages(value);
});

const fetchPages = async (value) => {
  results.innerHTML = "<div  class='loading'></div>";
  try {
    const data = await fetch(`${url}${value}`);
    const info = await data.json();
    const results = info.query.search;
    renderResults(results);
    console.log(info);
  } catch (error) {
    results.innerHTML = "<h4  class='error'>there was an error</h4>";
  }
};

const renderResults = (data) => {
  console.log(data);
  if (!data.length) {
    results.innerHTML = `<h4 class='error'>no results to show</h4>`;
    setTimeout(() => {
      results.innerHTML = "";
      input.value = "";
    }, 1000);

    return;
  }
  results.innerHTML = `
  <div class='articles'>
  ${data
    .map((result) => {
      return `<a href="${page_url}${result.pageid}" target="_blank">
            <h4>${result.title}</h4>
            <p>
              ${result.snippet}
            </p>
          </a>`;
    })
    .join("")}
  </div>
  
  `;
};
