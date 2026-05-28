(function () {
    const TEMPO_PADRAO = 3000;
    let timeoutAtual = null;

    function criarEstilos() {
        if (document.getElementById("notificacoes-estilos")) return;

        const style = document.createElement("style");
        style.id = "notificacoes-estilos";
        style.textContent = `
            .popup-toast {
                position: fixed;
                left: 50%;
                top: 20px;
                transform: translateX(-50%) translateY(-16px);
                width: calc(100% - 32px);
                max-width: 420px;
                padding: 14px 16px;
                border-radius: 12px;
                background: #333;
                color: #fff;
                font-size: 14px;
                line-height: 1.4;
                text-align: center;
                opacity: 0;
                pointer-events: none;
                z-index: 10000;
                box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
                transition: opacity 0.25s ease, transform 0.25s ease;
                white-space: pre-line;
            }

            .popup-toast.show {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }

            .popup-toast.success { background: #2f9e62; }
            .popup-toast.error { background: #d94b45; }
            .popup-toast.info { background: #2f66d0; }
            .popup-toast.warning { background: #b7791f; }

            .popup-overlay {
                position: fixed;
                inset: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
                background: rgba(17, 24, 39, 0.45);
                z-index: 10001;
            }

            .popup-dialog {
                width: min(100%, 380px);
                padding: 20px;
                border-radius: 12px;
                background: #fff;
                color: #1f2937;
                box-shadow: 0 16px 40px rgba(0, 0, 0, 0.22);
            }

            .popup-dialog p {
                margin: 0;
                font-size: 1rem;
                line-height: 1.45;
                white-space: pre-line;
            }

            .popup-acoes {
                display: flex;
                justify-content: flex-end;
                gap: 10px;
                margin-top: 18px;
            }

            .popup-acoes button {
                border: none;
                border-radius: 8px;
                padding: 0.65rem 1rem;
                cursor: pointer;
                font: inherit;
            }

            .popup-cancelar {
                background: #e5e7eb;
                color: #1f2937;
            }

            .popup-confirmar {
                background: #d94b45;
                color: #fff;
            }
        `;

        document.head.appendChild(style);
    }

    function obterToast() {
        criarEstilos();

        let toast = document.getElementById("popup-toast-global");

        if (!toast) {
            toast = document.createElement("div");
            toast.id = "popup-toast-global";
            toast.className = "popup-toast";
            toast.setAttribute("role", "status");
            toast.setAttribute("aria-live", "polite");
            document.body.appendChild(toast);
        }

        return toast;
    }

    window.mostrarPopup = function (mensagem, tipo = "info", tempo = TEMPO_PADRAO) {
        const toast = obterToast();

        clearTimeout(timeoutAtual);
        toast.textContent = mensagem instanceof Error ? mensagem.message : String(mensagem || "");
        toast.className = `popup-toast show ${tipo}`;

        timeoutAtual = setTimeout(() => {
            toast.classList.remove("show");
        }, tempo);
    };

    window.confirmarPopup = function (mensagem, opcoes = {}) {
        criarEstilos();

        return new Promise((resolve) => {
            const overlay = document.createElement("div");
            overlay.className = "popup-overlay";

            const dialog = document.createElement("div");
            dialog.className = "popup-dialog";
            dialog.setAttribute("role", "dialog");
            dialog.setAttribute("aria-modal", "true");

            const texto = document.createElement("p");
            texto.textContent = String(mensagem || "");

            const acoes = document.createElement("div");
            acoes.className = "popup-acoes";

            const cancelar = document.createElement("button");
            cancelar.type = "button";
            cancelar.className = "popup-cancelar";
            cancelar.textContent = opcoes.cancelar || "Cancelar";

            const confirmar = document.createElement("button");
            confirmar.type = "button";
            confirmar.className = "popup-confirmar";
            confirmar.textContent = opcoes.confirmar || "Confirmar";

            function finalizar(valor) {
                overlay.remove();
                resolve(valor);
            }

            cancelar.addEventListener("click", () => finalizar(false));
            confirmar.addEventListener("click", () => finalizar(true));
            overlay.addEventListener("click", (event) => {
                if (event.target === overlay) finalizar(false);
            });
            document.addEventListener("keydown", function fecharComEscape(event) {
                if (event.key === "Escape" && document.body.contains(overlay)) {
                    document.removeEventListener("keydown", fecharComEscape);
                    finalizar(false);
                }
            });

            acoes.append(cancelar, confirmar);
            dialog.append(texto, acoes);
            overlay.appendChild(dialog);
            document.body.appendChild(overlay);
            confirmar.focus();
        });
    };
})();
