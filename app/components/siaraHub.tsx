interface HubNodeProps {
    name: string;
    className?: string;
}

function HubNode({ name, className = "" }: HubNodeProps) {
    return (
        <div
            className={`absolute z-[4] flex h-[6cqw] w-[18.75cqw] flex-col items-center justify-center gap-[0.25cqw] rounded-[1.25cqw] border-[1.5px] border-[#FF296C] bg-[#141D30] ${className}`}
        >
            <b className="text-[1.5625cqw] font-extrabold tracking-[-0.03cqw] max-[700px]:text-[2cqw]">
                {name}
            </b>
            <span className="text-[0.875cqw] font-semibold text-[#8B95AE]">
                Partenaire actif
            </span>
        </div>
    );
}

export default function SiaraHub() {
    return (
        <section className="relative mx-auto aspect-[1600/1240] w-full max-w-[1600px] overflow-hidden bg-[#EEF2FA] text-white [container-type:inline-size]">
            <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
                <div className="absolute -top-[20%] left-[15%] h-[60cqw] w-[70cqw] rounded-full bg-white blur-[110px]" />
                <div className="absolute -top-[15%] -left-[15%] h-[55cqw] w-[55cqw] rounded-full bg-white blur-[110px]" />
                <div className="absolute -top-[10%] -right-[15%] h-[50cqw] w-[55cqw] rounded-full bg-white blur-[100px]" />
                <div className="absolute -bottom-[20%] left-[10%] h-[50cqw] w-[50cqw] rounded-full bg-white blur-[110px]" />
                <div className="absolute -right-[10%] -bottom-[10%] h-[50cqw] w-[50cqw] rounded-full bg-white blur-[120px]" />
                <div className="absolute left-[35%] top-[30%] h-[45cqw] w-[45cqw] rounded-full bg-white blur-[100px]" />
            </div>

            <div className="absolute top-[3cqw] left-0 right-0 z-[5] flex flex-col items-center gap-[0.75cqw] px-4">
                <h2 className="m-0 text-balance text-center text-[3.5cqw] font-extrabold leading-[1.05] tracking-[-0.09cqw] text-[#0B0F1E] max-[700px]:text-[4.4cqw]">
                    <span className="text-[#FF296C]">Siara,</span> le hub qui connecte
                    <br />
                    de milliers d'entreprises
                </h2>
                <p className="m-0 text-[1.5625cqw] font-semibold text-[#4B5468]">
                    Une seule plateforme. Plusieurs partenaires.{" "}
                    <span className="text-[#FF296C]">Zéro limite.</span>
                </p>
            </div>

            <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 1600 1240"
                preserveAspectRatio="xMidYMid meet"
                aria-hidden="true"
            >
                <circle
                    cx="800"
                    cy="740"
                    r="330"
                    fill="none"
                    stroke="#FF296C"
                    strokeWidth="1.5"
                    opacity="0.22"
                    strokeDasharray="4 10"
                />
                <g
                    className="animate-[cg-flow_6s_linear_infinite]"
                    stroke="#FF296C"
                    strokeWidth="2.5"
                    strokeDasharray="10 12"
                    fill="none"
                    opacity="0.8"
                >
                    <line x1="800" y1="740" x2="800" y2="430" />
                    <line x1="800" y1="740" x2="1207" y2="590" />
                    <line x1="800" y1="740" x2="1207" y2="890" />
                    <line x1="800" y1="740" x2="800" y2="1045" />
                    <line x1="800" y1="740" x2="393" y2="890" />
                    <line x1="800" y1="740" x2="393" y2="590" />
                </g>
            </svg>

            <div className="absolute left-[40.625cqw] top-[36.875cqw] z-[4] flex h-[18.75cqw] w-[18.75cqw] flex-col items-center justify-center gap-[0.625cqw] rounded-full border-2 border-[#FF296C] bg-[#05070F] shadow-[0_0_6cqw_rgba(255,45,22,0.5)]">
                <div className="flex h-[4.125cqw] w-[4.125cqw] items-center justify-center rounded-[1.1cqw] bg-[#FF296C] text-[2.125cqw] font-extrabold tracking-[-0.125cqw]">
                    go
                </div>
                <div className="text-[2.375cqw] font-extrabold leading-none tracking-[-0.0625cqw]">
                    Siara
                </div>
                <div className="text-[0.8125cqw] font-semibold uppercase tracking-[0.19cqw] text-[#6E7994]">
                    Hub de livraison
                </div>
            </div>

            <HubNode name="K.E.M Express" className="left-[40.625cqw] top-[22.625cqw]" />
            <HubNode name="Express Cargo" className="left-[66.0625cqw] top-[33.875cqw]" />
            <HubNode name="Trans-Sahel Express" className="left-[66.0625cqw] top-[52.625cqw]" />
            <HubNode
                name="Bomono Transit"
                className="left-[40.9375cqw] top-[62.3125cqw] w-[18.125cqw]"
            />
            <HubNode name="Vitesse Logistics" className="left-[15.1875cqw] top-[52.625cqw]" />
            <HubNode name="Zenko Delivery" className="left-[15.1875cqw] top-[33.875cqw]" />
        </section>
    );
}
