import { Box, Skeleton, Stack } from '@mui/material';

type LoadingSkeletonProps = {
  variant: 'lista' | 'spotlight';
};

export const LoadingSkeleton = ({
  variant,
}: LoadingSkeletonProps): JSX.Element => {
  if (variant === 'lista') {
    return (
      <Stack spacing={1.25}>
        {Array.from({ length: 8 }).map((_, indice) => (
          <Box
            key={indice}
            sx={{
              borderRadius: 3,
              bgcolor: 'rgba(255, 255, 255, 0.72)',
              p: 1.5,
            }}
          >
            <Skeleton variant="text" height={28} width="60%" />
            <Skeleton variant="text" height={18} width="40%" />
          </Box>
        ))}
      </Stack>
    );
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          xl: 'minmax(0, 1.08fr) minmax(0, 0.92fr)',
        },
        gap: 3,
      }}
    >
      <Box
        sx={{
          p: 2,
          borderRadius: 6,
          bgcolor: 'rgba(255,255,255,0.7)',
        }}
      >
        <Skeleton variant="rounded" height={420} />
        <Skeleton variant="text" height={32} sx={{ mt: 2 }} width="40%" />
        <Skeleton variant="text" height={22} width="58%" />
      </Box>

      <Box
        sx={{
          p: 2.5,
          borderRadius: 6,
          bgcolor: 'rgba(255,255,255,0.76)',
        }}
      >
        <Skeleton variant="text" height={42} width="55%" />
        <Skeleton variant="text" height={20} width="28%" />
        <Skeleton variant="rounded" height={164} sx={{ mt: 2 }} />
        <Skeleton variant="text" height={22} sx={{ mt: 2 }} />
        <Skeleton variant="text" height={22} width="94%" />
        <Skeleton variant="text" height={22} width="88%" />
        <Skeleton variant="text" height={22} width="82%" />
      </Box>
    </Box>
  );
};
