import React from "react";

import { FieldGroupContainer } from "./FieldGroup.styles";

type TFieldGroupProps = {
  name: string;
  label: string;
  error?: string;
  children: React.ReactElement;
};

export function FieldGroup(props: TFieldGroupProps) {
  const { name, label, children, error } = props;

  return (
    <FieldGroupContainer>
      <label htmlFor={name}>
        <b>{label}</b>
      </label>
      {React.cloneElement(children, { name })}
      {error ? <span>{error}</span> : null}
    </FieldGroupContainer>
  );
}
