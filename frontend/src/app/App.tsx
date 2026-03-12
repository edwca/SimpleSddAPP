import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import PetsRoundedIcon from '@mui/icons-material/PetsRounded';
import { Alert, Box, Button, Chip, LinearProgress, Stack, Typography } from '@mui/material';
import { useDeferredValue, useEffect, useState } from 'react';

import { BreedSpotlight } from '../features/breeds/components/BreedSpotlight';
import { ImageViewerDialog } from '../features/breeds/components/ImageViewerDialog';
import { Sidebar } from '../features/breeds/components/Sidebar';
import { useBreedHistoryQuery } from '../features/breeds/hooks/useBreedHistoryQuery';
import { useBreedsQuery } from '../features/breeds/hooks/useBreedsQuery';
import { useSelectedBreed } from '../hooks/useSelectedBreed';
import {
  descargarImagenRepresentativa,
  descargarPdfDeRaza,
  obtenerUrlImagenRepresentativa,
} from '../services/api';

export const App = (): JSX.Element => {
  const { razaSeleccionada, seleccionarRaza } = useSelectedBreed();
  const [imagenAmpliada, setImagenAmpliada] = useState<string | null>(null);
  const [descargandoImagen, setDescargandoImagen] = useState(false);
  const [descargandoPdf, setDescargandoPdf] = useState(false);
  const razaDiferida = useDeferredValue(razaSeleccionada);
  const consultaRazas = useBreedsQuery();
  const consultaHistoria = useBreedHistoryQuery(razaDiferida);

  useEffect(() => {
    if (!razaSeleccionada && consultaRazas.data?.datos[0]) {
      seleccionarRaza(consultaRazas.data.datos[0].id);
    }
  }, [consultaRazas.data, razaSeleccionada, seleccionarRaza]);

  const razaActual =
    consultaRazas.data?.datos.find((raza) => raza.id === razaSeleccionada) ?? null;
  const imagenRepresentativaUrl = razaDiferida
    ? obtenerUrlImagenRepresentativa(razaDiferida)
    : null;

  const descargarBlob = (blob: Blob, nombreArchivo: string): void => {
    const url = window.URL.createObjectURL(blob);
    const enlace = document.createElement('a');

    enlace.href = url;
    enlace.download = nombreArchivo;
    enlace.click();

    window.URL.revokeObjectURL(url);
  };

  const manejarDescargaImagen = async (): Promise<void> => {
    if (!razaSeleccionada || descargandoImagen) {
      return;
    }

    setDescargandoImagen(true);

    try {
      const blob = await descargarImagenRepresentativa(razaSeleccionada);
      descargarBlob(blob, `${razaSeleccionada}-imagen-principal.jpg`);
    } finally {
      setDescargandoImagen(false);
    }
  };

  const manejarDescargaPdf = async (): Promise<void> => {
    if (!razaSeleccionada || descargandoPdf) {
      return;
    }

    setDescargandoPdf(true);

    try {
      const blob = await descargarPdfDeRaza(razaSeleccionada);
      descargarBlob(blob, `${razaSeleccionada}-reporte.pdf`);
    } finally {
      setDescargandoPdf(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        background:
          'radial-gradient(circle at top right, rgba(103,232,207,0.22), transparent 30%), linear-gradient(180deg, #edf3f2 0%, #edf2f8 58%, #f8fbfb 100%)',
      }}
    >
      <Sidebar
        razas={consultaRazas.data?.datos ?? []}
        razaSeleccionada={razaSeleccionada}
        cargando={consultaRazas.isLoading}
        error={consultaRazas.isError}
        onSelectBreed={seleccionarRaza}
      />

      <Box
        component="main"
        sx={{
          flex: 1,
          width: '100%',
          px: { xs: 2, md: 4 },
          py: { xs: 3, md: 4 },
          pt: { xs: 10, md: 4 },
        }}
      >
        <Stack spacing={3.75} sx={{ width: '100%', maxWidth: '1360px', mx: 'auto' }}>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            justifyContent="space-between"
            alignItems={{ xs: 'flex-start', md: 'center' }}
            spacing={2}
          >
            <Stack spacing={1.25}>
              <Chip
                icon={<PetsRoundedIcon />}
                label="Search Dog"
                color="secondary"
                sx={{ width: 'fit-content', px: 0.5 }}
              />
              <Typography
                variant="h1"
                data-testid="selected-breed-title"
                sx={{ maxWidth: 820 }}
              >
                {razaActual ? razaActual.nombre : 'Selecciona una raza'}
              </Typography>
              <Typography color="text.secondary" sx={{ maxWidth: 720 }}>
                Una ficha compacta por raza con imagen recortada, contexto esencial
                y descargas servidas desde el backend proxy.
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              <Chip
                label={`${consultaRazas.data?.meta.total ?? 0} razas`}
                variant="outlined"
              />
              <Button
                variant="outlined"
                color="secondary"
                disabled={!razaActual || descargandoPdf}
                onClick={() => {
                  void manejarDescargaPdf();
                }}
                startIcon={<DownloadRoundedIcon />}
              >
                {descargandoPdf ? 'Generando PDF...' : 'Descargar PDF'}
              </Button>
            </Stack>
          </Stack>

          {consultaHistoria.isFetching ? <LinearProgress /> : null}

          {consultaRazas.isError ? (
            <Alert severity="error">
              No fue posible cargar el catalogo principal de razas.
            </Alert>
          ) : null}

          <BreedSpotlight
            raza={razaActual}
            historia={consultaHistoria.data?.datos ?? null}
            cargando={consultaHistoria.isLoading && Boolean(razaActual)}
            errorHistoria={consultaHistoria.isError}
            imageUrl={imagenRepresentativaUrl}
            descargandoImagen={descargandoImagen}
            onDownloadImage={() => {
              void manejarDescargaImagen();
            }}
            onOpenImage={(imageUrl) => {
              setImagenAmpliada(imageUrl);
            }}
          />
        </Stack>
      </Box>

      <ImageViewerDialog
        abierta={Boolean(imagenAmpliada)}
        breedName={razaActual?.nombre ?? null}
        imageUrl={imagenAmpliada}
        onClose={() => {
          setImagenAmpliada(null);
        }}
      />
    </Box>
  );
};
