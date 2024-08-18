export function getEnvironmentVariable(variableName: string) {
  return (import.meta.env[variableName] ?? process.env[variableName]) as string;
}
