<script>
  const url = '/api/mailsender';

  let isLoading = false;
  let resultText = '';
  const formData = {};
  const submitHandler = async (event) => {
    document.getElementById('button').disabled = true;
    isLoading = true;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      isLoading = false;
      if (result.result.success) {
        resultText = 'Your message was successfuly delivered!';
      } else {
        resultText = result.errors.join(';');
      }
    } catch (exception) {
      isLoading = false;
      resultText = 'ERRRORRRRR';
    }
  };
</script>

<main>
  {#if isLoading}
    <div class="loader">
      <img src="/loader.gif" alt="loader" />
    </div>
  {:else}
    <div class="bg-contact2">
      <div class="container-contact2">
        <div class="wrap-contact2">
          <form
            class="contact2-form validate-form"
            on:submit|preventDefault={submitHandler}
          >
            <span class="contact2-form-title"> Contact Us </span>

            <div class="wrap-input2" data-validate="Name is required">
              <input
                class="input2"
                type="text"
                name="name"
                bind:value={formData.name}
              />
              <span class="focus-input2 empty" data-placeholder="NAME" />
            </div>
            <div
              class="wrap-input2 "
              data-validate="Valid email is required: ex@abc.xyz"
            >
              <input
                class="input2"
                type="email"
                name="email"
                bind:value={formData.email}
              />
              <span class="focus-input2 empty" data-placeholder="EMAIL" />
            </div>

            <div class="wrap-input2" data-validate="Message is required">
              <textarea
                class="input2"
                name="message"
                bind:value={formData.message}
              />
              <span class="focus-input2 empty" data-placeholder="MESSAGE" />
            </div>

            <div class="container-contact2-form-btn">
              <div class="wrap-contact2-form-btn">
                <div class="contact2-form-bgbtn" />
                <button class="contact2-form-btn" id="button">
                  Send Your Message
                </button>
              </div>
            </div>
            <div class="result">
              {resultText}
            </div>
          </form>
        </div>
      </div>
    </div>
  {/if}
</main>

<style>
  input {
    outline: none;
    border: none;
  }

  textarea {
    outline: none;
    border: none;
  }

  .bg-contact2 {
    width: 100%;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
  }
  .container-contact2 {
    min-height: 100vh;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 15px;
    background: rgba(219, 21, 99, 0.8);
    background: -webkit-linear-gradient(
      45deg,
      rgba(213, 0, 125, 0.8),
      rgba(229, 57, 53, 0.8)
    );
    background: -o-linear-gradient(
      45deg,
      rgba(213, 0, 125, 0.8),
      rgba(229, 57, 53, 0.8)
    );
    background: -moz-linear-gradient(
      45deg,
      rgba(213, 0, 125, 0.8),
      rgba(229, 57, 53, 0.8)
    );
    background: linear-gradient(
      45deg,
      rgba(213, 0, 125, 0.8),
      rgba(229, 57, 53, 0.8)
    );
  }

  .wrap-contact2 {
    width: 790px;
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
    padding: 72px 55px 90px 55px;
  }

  .contact2-form {
    width: 100%;
    visibility: visible;
  }

  .contact2-form-title {
    display: block;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 39px;
    color: #333333;
    line-height: 1.2;
    text-align: center;
    padding-bottom: 90px;
  }

  .wrap-input2 {
    width: 100%;
    position: relative;
    border-bottom: 2px solid #adadad;
    margin-bottom: 37px;
  }

  .input2 {
    display: block;
    width: 100%;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 15px;
    color: #555555;
    line-height: 1.2;
  }

  .focus-input2 {
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
  }

  .focus-input2::before {
    content: '';
    display: block;
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;

    -webkit-transition: all 0.4s;
    -o-transition: all 0.4s;
    -moz-transition: all 0.4s;
    transition: all 0.4s;

    background: rgba(219, 21, 99, 1);
    background: -webkit-linear-gradient(45deg, #d5007d, #e53935);
    background: -o-linear-gradient(45deg, #d5007d, #e53935);
    background: -moz-linear-gradient(45deg, #d5007d, #e53935);
    background: linear-gradient(45deg, #d5007d, #e53935);
  }

  .focus-input2::after {
    content: attr(data-placeholder);
    display: block;
    width: 100%;
    position: absolute;
    left: 0;

    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 13px;
    color: #999999;
    line-height: 1.2;

    -webkit-transition: all 0.4s;
    -o-transition: all 0.4s;
    -moz-transition: all 0.4s;
    transition: all 0.4s;
  }

  .empty {
    top: 16px;
  }

  input.input2 {
    height: 45px;
  }

  textarea.input2 {
    min-height: 115px;
    padding-top: 13px;
    padding-bottom: 13px;
  }

  .container-contact2-form-btn {
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding-top: 13px;
  }

  .wrap-contact2-form-btn {
    display: block;
    position: relative;
    z-index: 1;
    border-radius: 2px;
    width: auto;
    overflow: hidden;
    margin: 0 auto;
  }

  .contact2-form-bgbtn {
    position: absolute;
    z-index: -1;
    width: 300%;
    height: 100%;
    background: rgba(219, 21, 99, 1);
    background: -webkit-linear-gradient(
      -135deg,
      #d5007d,
      #e53935,
      #d5007d,
      #e53935
    );
    background: -o-linear-gradient(-135deg, #d5007d, #e53935, #d5007d, #e53935);
    background: -moz-linear-gradient(
      -135deg,
      #d5007d,
      #e53935,
      #d5007d,
      #e53935
    );
    background: linear-gradient(-135deg, #d5007d, #e53935, #d5007d, #e53935);
    top: 0;
    left: -100%;

    -webkit-transition: all 0.4s;
    -o-transition: all 0.4s;
    -moz-transition: all 0.4s;
    transition: all 0.4s;
  }

  .contact2-form-btn {
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
    min-width: 244px;
    height: 50px;
    background-color: none;

    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 16px;
    color: #fff;
    line-height: 1.2;
  }

  .wrap-contact2-form-btn:hover .contact2-form-bgbtn {
    left: 0;
  }

  .loader {
    position: absolute;
    width: 1em;
    height: 1em;
    align-items: center;
  }

  @media (max-width: 576px) {
    .wrap-contact2 {
      padding: 72px 15px 90px 15px;
      width: 100%;
    }
  }
</style>
