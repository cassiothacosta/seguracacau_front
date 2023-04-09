import Link from 'next/link'

const formRegister = ({ errorMessage, onSubmit }: any) => (
  <form onSubmit={onSubmit}>
    <label>
      <span>Nome da despesa</span>
      <input type="text" name="name" required />
    </label>
    <label>
      <span>tipo de despesa</span>
      <input type="text" name="type" required />
    </label>
    <label>
      <span>categoria da despesa</span>
      <input type="text" name="category" required />
    </label>
    <label>
      <span>periodicidade</span>
      <input type="text" name="period" required />
    </label>
    <label>
      <span>valor</span>
      <input type="text" name="value" required />
    </label>

    <div className="submit">
        <>
          <button type="submit">Enviar</button>
        </>
    </div>

    {errorMessage && <p className="error">{errorMessage}</p>}

    <style jsx>{`
      form,
      label {
        display: flex;
        flex-flow: column;
      }
      label > span {
        font-weight: 600;
      }
      input {
        padding: 8px;
        margin: 0.3rem 0 1rem;
        border: 1px solid #ccc;
        border-radius: 4px;
      }
      .submit {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        justify-content: space-between;
      }
      .submit > a {
        text-decoration: none;
      }
      .submit > button {
        padding: 0.5rem 1rem;
        cursor: pointer;
        background: #fff;
        border: 1px solid #ccc;
        border-radius: 4px;
      }
      .submit > button:hover {
        border-color: #888;
      }
      .error {
        color: brown;
        margin: 1rem 0 0;
      }
    `}</style>
  </form>
)

export default formRegister
