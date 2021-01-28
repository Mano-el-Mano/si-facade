import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { LoggingService } from 'src/logging/logging.service';
import { LogTypes } from 'src/logTypes';

@Controller('reviews')
export class ReviewsController {
  private logType: LogTypes;
  constructor(
    private readonly reviewsService: ReviewsService, // private readonly loggingService: LoggingService,
  ) {
    this.logType = LogTypes.CAR_REVIEW;
  }

  @Get('tasks')
  getTasks() {
    return this.reviewsService.getTasks();
  }

  @Post('/task/review/:taskId')
  async completeCreateTask(
    @Param('taskId') taskId: string,
    @Body() createReviewDto: CreateReviewDto,
  ) {
    /*return this.reviewsService.completeCreateReviewTask(
      taskId,
      createReviewDto,
    );*/
  }

  @Post('task/share/:taskId')
  async completeShareTask(@Param('taskId') taskid: string) {
    return this.reviewsService.completeShareTask(taskid);
  }

  @Get()
  async getReviews() {
    return this.reviewsService.getReviews();
  }
}
