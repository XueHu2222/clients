import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { Pet } from '../../prisma/types.ts';

const prisma: PrismaClient = new PrismaClient();

interface PetResponse {
  meta: {
    count: number;
    title: string;
    url: string;
  };
  data: Pet[];
}


export async function getPets(req: Request, res: Response): Promise<void> {
  try {
    const pets: Pet[] = await prisma.pet.findMany({
      where: { specie: 'Dog' }
    });

    const petResponse: PetResponse = {
      meta: {
        count: pets.length,
        title: 'All dogs',
        url: req.url
      },
      data: pets
    };

    res.status(200).send(petResponse);
  } catch (error) {
    res.status(500).send({
      error: {
        message: 'Failed to retrieve dogs',
        code: 'SERVER_ERROR',
        url: req.url
      }
    });
  }
}


export async function getPet(req: Request, res: Response): Promise<void> {
  try {
    const id: number = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).send({
        error: {
          message: 'Invalid pet ID',
          code: 'INVALID_ID',
          url: req.url
        }
      });
      return;
    }

    const pet: Pet | null = await prisma.pet.findUnique({ where: { id } });

    if (!pet || pet.specie !== 'Dog') {
      res.status(404).send({
        error: {
          message: `Dog with ID ${id} not found`,
          code: 'NOT_FOUND',
          url: req.url
        }
      });
      return;
    }

    res.status(200).send(pet);
  } catch (error) {
    res.status(500).send({
      error: {
        message: 'Internal server error',
        code: 'SERVER_ERROR',
        url: req.url
      }
    });
  }
}

