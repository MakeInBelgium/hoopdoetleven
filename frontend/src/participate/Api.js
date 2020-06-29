const doSubmission = async (data) => {
    const myHeaders = new Headers();
    myHeaders.append("accept", "application/ld+json");
    myHeaders.append("Content-Type", "application/json");
    
    const raw = JSON.stringify(data);
    
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    const response = await fetch("https://localhost:8443/submissions", requestOptions);

    console.log(response.status);

    const json = response.json();

    return json;
};

export default {
    doSubmission,
};
