import { useState, useEffect } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Button } from "@mui/material";

export default function PurchaseStepGuide() {
  const [stepStatus, setStepStatus] = useState(0);

  const handleStep = () => {};

  const steps = [
    "Wallet & Mainnet Connect ",
    "Find & Buy NFT",
    "Wait & Receive NFT",
    "teetTest 4 ",
  ];

  return (
    <>
      <div>
        <div className="absolute flex rounded-lg outline-none justify-between p-10 mt-20 bg-white w-[800px]">
          <Stepper activeStep={stepStatus} alternativeLabel className="w-full">
            {steps.map((label, id: number) => (
              <Step className="" key={id}>
                <StepLabel
                  className={`${stepStatus == id ? "animate-pulse" : null}`}
                >
                  <span>{label}</span>
                </StepLabel>
                <Button
                  className={`${
                    stepStatus !== id ? "text-slate-600" : null
                  } pl-20`}
                  onClick={() => {
                    setStepStatus(id);
                  }}
                >
                  TestBtn
                </Button>
              </Step>
            ))}
          </Stepper>
        </div>
      </div>
    </>
  );
}
