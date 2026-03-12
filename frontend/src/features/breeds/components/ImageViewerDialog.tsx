import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import {
  Box,
  Dialog,
  DialogContent,
  IconButton,
  Link,
  Stack,
  Typography,
} from '@mui/material';

type ImageViewerDialogProps = {
  abierta: boolean;
  breedName: string | null;
  imageUrl: string | null;
  onClose: () => void;
};

export const ImageViewerDialog = ({
  abierta,
  breedName,
  imageUrl,
  onClose,
}: ImageViewerDialogProps): JSX.Element => {
  return (
    <Dialog
      open={abierta}
      onClose={onClose}
      fullWidth
      maxWidth="lg"
      PaperProps={{
        sx: {
          borderRadius: '28px',
          overflow: 'hidden',
          background:
            'linear-gradient(180deg, rgba(14, 18, 30, 0.96) 0%, rgba(7, 10, 18, 0.94) 100%)',
          backdropFilter: 'blur(28px)',
          border: '1px solid rgba(255,255,255,0.08)',
        },
      }}
    >
      <DialogContent sx={{ p: 0 }}>
        <Stack spacing={0}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              px: 2.5,
              py: 1.8,
              color: 'common.white',
            }}
          >
            <Stack spacing={0.25}>
              <Typography variant="h6">{breedName ?? 'Imagen ampliada'}</Typography>
              {imageUrl ? (
                <Link
                  href={imageUrl}
                  target="_blank"
                  rel="noreferrer"
                  color="inherit"
                  underline="hover"
                  sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75 }}
                >
                  Abrir imagen
                  <OpenInNewRoundedIcon fontSize="inherit" />
                </Link>
              ) : null}
            </Stack>
            <IconButton onClick={onClose} sx={{ color: 'common.white' }}>
              <CloseRoundedIcon />
            </IconButton>
          </Stack>

          <Box
            sx={{
              bgcolor: '#020617',
              display: 'grid',
              placeItems: 'center',
              px: { xs: 1.5, md: 2.5 },
              pb: { xs: 1.5, md: 2.5 },
            }}
          >
            {imageUrl ? (
              <Box
                component="img"
                src={imageUrl}
                alt={breedName ? `Imagen ampliada de ${breedName}` : 'Imagen ampliada'}
                sx={{
                  width: '100%',
                  maxHeight: '78vh',
                  objectFit: 'contain',
                  objectPosition: 'center',
                  borderRadius: '24px',
                  boxShadow: '0 22px 60px rgba(0, 0, 0, 0.32)',
                }}
              />
            ) : null}
          </Box>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
