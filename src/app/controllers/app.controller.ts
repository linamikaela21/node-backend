import { Controller, Get, HttpStatus, Redirect } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  @Redirect('/docs', HttpStatus.PERMANENT_REDIRECT)
  @Get()
  @ApiOperation({ summary: 'Redirect to Swagger Documentation' })
  @ApiOkResponse({
    description: 'Redirect to Swagger Documentation',
    status: HttpStatus.PERMANENT_REDIRECT,
  })
  getDocs() {
    return;
  }
}
