import { useState } from "react";
import styles from "./ModalRecuperarSenha.module.css";
import { enviarCodigoRecuperacao, redefinirSenha } from "../../service/RecuperarSenha";

export default function ModalRecuperarSenha({ onClose }) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [codigo, setCodigo] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleEnviarCodigo(e) {
    e.preventDefault();
    setErro("");
    setLoading(true);
    try {
      await enviarCodigoRecuperacao(email);
      setStep(2);
    } catch (err) {
      setErro(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleRedefinir(e) {
    e.preventDefault();
    setErro("");
    if (novaSenha !== confirmarSenha) return setErro("As senhas não coincidem");
    if (novaSenha.length < 6) return setErro("A senha deve ter no mínimo 6 caracteres");
    setLoading(true);
    try {
      await redefinirSenha(email, codigo, novaSenha);
      setStep(4);
    } catch (err) {
      setErro(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>✕</button>

        <div className={styles.steps}>
          {[1, 2, 3].map((s) => (
            <div key={s} className={`${styles.stepDot} ${step === s ? styles.active : step > s ? styles.done : ""}`} />
          ))}
        </div>

        {step === 1 && (
          <form onSubmit={handleEnviarCodigo}>
            <div className={styles.icon}>📧</div>
            <h2>Recuperar senha</h2>
            <p>Informe seu e-mail e enviaremos um código de verificação.</p>
            <div className={styles.inputGroup}>
              <label>E-MAIL</label>
              <input type="email" placeholder="exemplo@email.com" value={email}
                onChange={(e) => setEmail(e.target.value)} required />
            </div>
            {erro && <span className={styles.erro}>{erro}</span>}
            <button type="submit" className={styles.btn} disabled={loading}>
              {loading ? "Enviando..." : "Enviar código"}
            </button>
          </form>
        )}

        {(step === 2 || step === 3) && (
          <form onSubmit={step === 2 ? (e) => { e.preventDefault(); setErro(""); setStep(3); } : handleRedefinir}>
            <div className={styles.icon}>{step === 2 ? "🔐" : "🔒"}</div>
            <h2>{step === 2 ? "Código de verificação" : "Nova senha"}</h2>
            <p>{step === 2 ? "Digite o código de 6 dígitos enviado para o seu e-mail." : "Crie uma senha forte para sua conta."}</p>

            {step === 2 && (
              <div className={styles.inputGroup}>
                <label>CÓDIGO</label>
                <input type="text" placeholder="000000" maxLength={6} value={codigo}
                  onChange={(e) => setCodigo(e.target.value)} required />
              </div>
            )}

            {step === 3 && (
              <>
                <div className={styles.inputGroup}>
                  <label>NOVA SENHA</label>
                  <input type="password" placeholder="••••••••" value={novaSenha}
                    onChange={(e) => setNovaSenha(e.target.value)} required />
                </div>
                <div className={styles.inputGroup}>
                  <label>CONFIRMAR SENHA</label>
                  <input type="password" placeholder="••••••••" value={confirmarSenha}
                    onChange={(e) => setConfirmarSenha(e.target.value)} required />
                </div>
              </>
            )}

            {erro && <span className={styles.erro}>{erro}</span>}
            <button type="submit" className={styles.btn} disabled={loading}>
              {loading ? "Aguarde..." : step === 2 ? "Verificar código" : "Redefinir senha"}
            </button>
          </form>
        )}

        {step === 4 && (
          <div className={styles.sucesso}>
            <div className={styles.successIcon}>✓</div>
            <h3>Senha redefinida!</h3>
            <p>Sua senha foi atualizada com sucesso. Faça login com a nova senha.</p>
            <button className={styles.btn} onClick={onClose}>Voltar ao login</button>
          </div>
        )}
      </div>
    </div>
  );
}