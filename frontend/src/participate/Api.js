const endpointUrl = (endpoint) => `${window.HDL_CONF.apiLocation}/${endpoint}`;

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

    const response = await fetch(endpointUrl("submissions"), requestOptions);

    if(response.status === 201) {
      return true;
    }

    const json = response.json();

    return json;
};

export default {
    doSubmission,
};
