const endpointUrl = (endpoint) => `${window.HDL_CONF.apiLocation}/${endpoint}`;

const grecaptchaReady = () => {
  return new Promise((resolve, reject) => {
    grecaptcha.ready(function () {
      resolve();
    });
  })
}

const doSubmission = async (data) => {
  if (typeof grecaptcha === "undefined") {
    return false;
  }

  try {
    await grecaptchaReady();
    const token = await grecaptcha.execute(`${window.HDL_CONF.recaptchaKey}`, { action: 'submit' });
    const raw = JSON.stringify({ ...data, token, from: window.location.hostname });

    const myHeaders = new Headers();
    myHeaders.append("accept", "application/ld+json");
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    const response = await fetch(endpointUrl("submissions"), requestOptions);

    if (response.status !== 201) {
      if (response.status === 401) {
        throw new Error('validation.failedVerification');
      }


      if (response.status === 400) {
        // Validation errors
        const json = response.json();
        return json;
      }

      return false;
    }

    return true;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default {
  doSubmission,
};
