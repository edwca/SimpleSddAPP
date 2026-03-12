import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import OpenInFullRoundedIcon from '@mui/icons-material/OpenInFullRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';

import { LoadingSkeleton } from '../../../components/LoadingSkeleton';
import type { HistoriaDeRaza, Raza } from '../../../types/breed';

type BreedSpotlightProps = {
  raza: Raza | null;
  historia: HistoriaDeRaza | null;
  cargando: boolean;
  errorHistoria: boolean;
  imageUrl: string | null;
  descargandoImagen: boolean;
  onDownloadImage: () => void;
  onOpenImage: (imageUrl: string) => void;
};

const LONGITUD_MAXIMA_INTRO = 170;

const limpiarTexto = (texto: string): string => texto.replace(/\s+/g, ' ').trim();

const truncarTexto = (texto: string, longitudMaxima: number): string => {
  if (texto.length <= longitudMaxima) {
    return texto;
  }

  return `${texto.slice(0, longitudMaxima - 1).trimEnd()}...`;
};

const construirIntroDeRaza = (
  raza: Raza,
  historia: HistoriaDeRaza | null,
): string => {
  const resumen = limpiarTexto(historia?.historia ?? '');
  const primeraOracion = resumen.split(/(?<=[.!?])\s+/)[0] ?? '';

  if (primeraOracion) {
    return `Dato curioso: ${truncarTexto(primeraOracion, LONGITUD_MAXIMA_INTRO)}`;
  }

  if (raza.subRazas.length > 0) {
    return `${raza.nombre} aparece en el catalogo con ${raza.subRazas.length} variante(s) registrada(s) y una silueta facil de reconocer a primera vista.`;
  }

  return `${raza.nombre} entra en foco con una presencia visual muy marcada y una ficha breve para reconocerla rapido.`;
};

export const BreedSpotlight = ({
  raza,
  historia,
  cargando,
  errorHistoria,
  imageUrl,
  descargandoImagen,
  onDownloadImage,
  onOpenImage,
}: BreedSpotlightProps): JSX.Element => {
  const [imagenCargando, setImagenCargando] = useState(true);
  const [imagenConError, setImagenConError] = useState(false);

  useEffect(() => {
    setImagenCargando(Boolean(imageUrl));
    setImagenConError(false);
  }, [imageUrl]);

  const introDeRaza = raza ? construirIntroDeRaza(raza, historia) : '';

  if (cargando) {
    return <LoadingSkeleton variant="spotlight" />;
  }

  if (!raza) {
    return (
      <Paper
        sx={{
          p: { xs: 3, md: 4 },
          borderRadius: '32px',
          background: 'rgba(255,255,255,0.74)',
          backdropFilter: 'blur(22px)',
          border: '1px solid rgba(255,255,255,0.55)',
        }}
      >
        <Stack spacing={1.2}>
          <Typography variant="h4">Explora una raza</Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 680 }}>
            El panel principal mostrara una imagen representativa y una reseña
            resumida cuando elijas una raza desde la navegacion lateral.
          </Typography>
        </Stack>
      </Paper>
    );
  }

  return (
    <Box
      data-testid="breed-spotlight"
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          lg: 'minmax(0, 0.92fr) minmax(360px, 0.88fr)',
        },
        gap: { xs: 2.5, lg: 3.5 },
        alignItems: 'start',
        width: '100%',
        maxWidth: '1280px',
        mx: 'auto',
      }}
    >
      <Paper
        sx={{
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
          maxWidth: { xs: '100%', lg: '720px' },
          minHeight: { xs: 300, md: 360 },
          aspectRatio: { xs: '4 / 3', md: '5 / 4' },
          justifySelf: 'center',
          borderRadius: '36px',
          background:
            'linear-gradient(160deg, rgba(6, 14, 25, 0.95) 0%, rgba(15, 118, 110, 0.72) 140%)',
          boxShadow: '0 28px 72px rgba(11, 18, 32, 0.16)',
          border: '1px solid rgba(255,255,255,0.14)',
        }}
      >
        {imageUrl ? (
          <>
            <Box
              component="img"
              src={imageUrl}
              alt={`Imagen principal de ${raza.nombre}`}
              data-testid="featured-image"
              onLoad={() => setImagenCargando(false)}
              onError={() => {
                setImagenCargando(false);
                setImagenConError(true);
              }}
              sx={{
                width: '100%',
                height: '100%',
                minHeight: { xs: 300, md: 360 },
                objectFit: 'cover',
                display: imagenConError ? 'none' : 'block',
                transform: imagenCargando ? 'scale(1.035)' : 'scale(1)',
                transition: 'transform 320ms ease, opacity 220ms ease',
                opacity: imagenCargando ? 0.42 : 1,
              }}
            />
            {imagenCargando ? (
              <Stack
                spacing={1.25}
                justifyContent="center"
                alignItems="center"
                sx={{
                  position: 'absolute',
                  inset: 0,
                  zIndex: 2,
                  background: 'rgba(5, 9, 18, 0.34)',
                  backdropFilter: 'blur(10px)',
                  color: 'common.white',
                }}
              >
                <CircularProgress color="secondary" thickness={4.6} />
                <Typography
                  variant="body2"
                  sx={{ color: 'rgba(255,255,255,0.88)', letterSpacing: '0.02em' }}
                >
                  Cargando imagen principal...
                </Typography>
              </Stack>
            ) : null}
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                zIndex: 1,
                background:
                  'linear-gradient(180deg, rgba(5, 9, 18, 0.02) 18%, rgba(5, 9, 18, 0.78) 100%)',
              }}
            />
          </>
        ) : null}

        {imagenConError || !imageUrl ? (
          <Stack
            spacing={1.2}
            justifyContent="center"
            alignItems="flex-start"
            sx={{
              height: '100%',
              px: { xs: 2.5, md: 4 },
              py: { xs: 3, md: 4 },
              color: 'common.white',
              position: 'relative',
              zIndex: 2,
            }}
          >
            <Typography variant="h4">Imagen no disponible</Typography>
            <Typography sx={{ maxWidth: 440, color: 'rgba(255,255,255,0.78)' }}>
              No fue posible cargar la imagen representativa de esta raza desde el
              proxy interno.
            </Typography>
          </Stack>
        ) : null}

        <Stack
          spacing={1.5}
          sx={{
            position: 'absolute',
            left: { xs: 18, md: 24 },
            right: { xs: 18, md: 24 },
            bottom: { xs: 18, md: 24 },
            zIndex: 3,
            maxWidth: { xs: 'none', lg: '560px' },
            px: { xs: 2, md: 2.5 },
            py: { xs: 2, md: 2.5 },
            color: 'common.white',
            borderRadius: '28px',
            background:
              'linear-gradient(180deg, rgba(7, 12, 22, 0.38) 0%, rgba(7, 12, 22, 0.7) 100%)',
            backdropFilter: 'blur(18px)',
            border: '1px solid rgba(255,255,255,0.16)',
            textAlign: { xs: 'left', md: 'center' },
            alignItems: { xs: 'flex-start', md: 'center' },
          }}
        >
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            <Chip
              label="Imagen representativa"
              sx={{
                bgcolor: 'rgba(255,255,255,0.16)',
                color: 'common.white',
                backdropFilter: 'blur(18px)',
              }}
            />
            {raza.subRazas.length > 0 ? (
              <Chip
                label={`${raza.subRazas.length} subraza(s)`}
                sx={{
                  bgcolor: 'rgba(255,255,255,0.12)',
                  color: 'rgba(255,255,255,0.88)',
                }}
              />
            ) : null}
          </Stack>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            alignItems={{ xs: 'flex-start', md: 'center' }}
            spacing={1.5}
            sx={{ width: '100%' }}
          >
            <Stack
              spacing={0.75}
              sx={{
                flex: 1,
                alignItems: { xs: 'flex-start', md: 'center' },
              }}
            >
              <Typography variant="h3" sx={{ color: 'common.white' }}>
                {raza.nombre}
              </Typography>
              <Typography
                sx={{
                  color: 'rgba(255,255,255,0.82)',
                  maxWidth: 420,
                }}
              >
                {introDeRaza}
              </Typography>
            </Stack>

            <Stack
              direction="row"
              spacing={1}
              flexWrap="wrap"
              useFlexGap
              justifyContent={{ xs: 'flex-start', md: 'center' }}
            >
              <Button
                variant="contained"
                color="secondary"
                startIcon={<DownloadRoundedIcon />}
                disabled={descargandoImagen || imagenConError}
                onClick={onDownloadImage}
              >
                {descargandoImagen ? 'Descargando...' : 'Descargar imagen'}
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                startIcon={<OpenInFullRoundedIcon />}
                disabled={!imageUrl || imagenConError}
                onClick={() => {
                  if (imageUrl) {
                    onOpenImage(imageUrl);
                  }
                }}
                sx={{
                  borderColor: 'rgba(255,255,255,0.32)',
                  color: 'common.white',
                }}
              >
                Ampliar
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Paper>

      <Paper
        sx={{
          p: { xs: 2.75, md: 3.5 },
          minHeight: { xs: 'auto', lg: '100%' },
          borderRadius: '32px',
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.82) 0%, rgba(247,251,251,0.88) 100%)',
          backdropFilter: 'blur(22px)',
          border: '1px solid rgba(255,255,255,0.6)',
          boxShadow: '0 22px 70px rgba(11, 18, 32, 0.08)',
        }}
      >
        <Stack spacing={2.5}>
          <Stack
            spacing={1}
            sx={{
              textAlign: { xs: 'left', md: 'center' },
              alignItems: { xs: 'flex-start', md: 'center' },
            }}
          >
            <Typography
              variant="overline"
              sx={{ letterSpacing: '0.22em', color: 'secondary.dark' }}
            >
              Contexto e historia
            </Typography>
            <Typography variant="h4">Perfil narrativo</Typography>
            <Typography color="text.secondary" sx={{ maxWidth: 560 }}>
              Resumen editorial, datos esenciales y referencia de apoyo en una sola
              lectura.
            </Typography>
          </Stack>

          {errorHistoria ? (
            <Alert severity="error">
              No fue posible cargar la historia de la raza seleccionada.
            </Alert>
          ) : null}

          <Box
            sx={{
              p: { xs: 2, md: 2.5 },
              borderRadius: '28px',
              background:
                'linear-gradient(180deg, rgba(236,253,245,0.84) 0%, rgba(255,255,255,0.72) 100%)',
              border: '1px solid rgba(15,118,110,0.12)',
            }}
          >
            <Typography
              color="text.primary"
              sx={{
                lineHeight: 1.9,
                whiteSpace: 'pre-line',
                textWrap: 'pretty',
              }}
            >
              {historia?.historia ||
                'La historia de esta raza no esta disponible en este momento.'}
            </Typography>
          </Box>

          <Stack
            direction="row"
            spacing={1}
            flexWrap="wrap"
            useFlexGap
            justifyContent={{ xs: 'flex-start', md: 'center' }}
          >
            {raza.subRazas.length > 0
              ? raza.subRazas.map((subRaza) => (
                  <Chip key={subRaza} label={subRaza} variant="outlined" />
                ))
              : (
                  <Chip label="Sin subrazas registradas" variant="outlined" />
                )}
          </Stack>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            spacing={1.5}
          >
            <Box>
              <Typography variant="caption" color="text.secondary">
                Fuente utilizada
              </Typography>
              <Typography variant="subtitle1">
                {historia?.fuente.nombre || 'Resumen interno'}
              </Typography>
            </Box>

            {historia?.fuente.url ? (
              <Button
                variant="text"
                color="secondary"
                href={historia.fuente.url}
                target="_blank"
                rel="noreferrer"
                endIcon={<OpenInNewRoundedIcon />}
                sx={{ alignSelf: { xs: 'flex-start', sm: 'center' } }}
              >
                Abrir referencia
              </Button>
            ) : null}
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
};
