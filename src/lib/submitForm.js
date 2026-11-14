const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function submitForm(payload) {
  await wait(900);

  return {
    ok: true,
    reference: `E2E-${Date.now().toString().slice(-6)}`,
    submittedAt: new Date().toISOString(),
    payload,
  };
}

export default submitForm;
