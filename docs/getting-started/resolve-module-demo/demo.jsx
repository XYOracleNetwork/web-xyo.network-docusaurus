import { VisibilityRounded, DeleteRounded } from "@mui/icons-material"
import React, { useState } from "react";
import { Box, Button, Card, CardContent, CardHeader } from "@mui/material"
import { ArchivistCard } from "@xyo-network/sdk-xyo-react"
import { useSetupModules } from "./useSetupModules"
import { modules } from "./lib"

export default function App() {
  const { archivist, node } = useSetupModules()
  const [all, setAll] = useState()

  const clearArchivist = async () => {
    if (archivist) {
      await archivist.clear();
      setAll(undefined);
    }
  };

  const insertIntoArchivist = async (payload) => {
    if (archivist) {
      await archivist.insert(payload);
      const all = await archivist.all();
      setAll(all);
    }
  };

  const witnessSystemInfo = async () => {
    if (node) {
      const moduleName = modules.SystemInfoWitness ?? "";
      // Retrieve the System Info Witness from our Sample Node
      const [systemInfoWitness] = await node.resolve({ name: [moduleName] });

      // Invoke the witness with .observe() to generate a payload containing the system info
      const result = await (systemInfoWitness).observe();
      await insertIntoArchivist(result);
    }
  };

  return (
    <Box alignItems="stretch" gap="16px" display="flex" flexDirection="column">
      {module ? <ArchivistCard module={archivist} /> : null}
      <Box display="flex" gap="16px" justifyContent="space-between">
        <Button
          startIcon={<VisibilityRounded />}
          onClick={witnessSystemInfo}
          variant="contained"
        >
          Witness System Information
        </Button>
        <Button
          color={"error"}
          onClick={clearArchivist}
          startIcon={<DeleteRounded />}
          variant={"contained"}
        >
          Clear Archivist
        </Button>
      </Box>
      {all?.length ? (
        <Card>
          <CardHeader title={"Archivist Payloads"} />
          <CardContent>
            {/* Raw output of the data saved to our Archivist */}
            <pre>{JSON.stringify(all, null, 2)}</pre>
          </CardContent>
        </Card>
      ) : null}
    </Box>
  );
}